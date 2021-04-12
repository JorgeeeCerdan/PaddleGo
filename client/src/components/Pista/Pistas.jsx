import React, { useState, useEffect } from "react";
import axios from 'axios'
import {ACCESS_TOKEN_NAME} from "../../constants/constants.jsx"
import { Link } from "react-router-dom";
import NavbarApp from '../NavbarApp.jsx'
import PistaCrear from "./PistaCrear";


const Pistas = () => {
    
    const [pistas, setPistas] = useState([])
    const [pistasCorrecto, setPistasCorrecto] = useState("")
    const [pistasError, setPistasError] = useState("")

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}
        
        axios.get("http://localhost:5000/pistas", config)
        .then(response => {
            if(response.data.pistas.length < 1){
                setPistasError("Añade una pista para que tus usuarios puedan reservarla")
            }
            setPistasCorrecto(response.data.message)
            setPistas(response.data.pistas)
        })
        .catch(error => setPistasError(error.response.data.message))

    },[])

    return(
        <div>
            <NavbarApp />
            <PistaCrear/>

            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                       <div className="col-sm-12 col-md-6 col-lg-4 py-4 ">
                            {pistasCorrecto && <h1 className="fw-bold">{pistasCorrecto}</h1>}
                            {pistasError && <h1 className="fw-bold">{pistasError}</h1>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid mb-5">
                <div className="container">
                    <div className="row">
                        {pistas.map( pista => (
                            <Link to={`/pista/${pista._id}`} key={pista._id} className="text-decoration-none col-sm-12 col-md-6 col-lg-4 p-5 m-4 rounded shadow flex-fill">
                                <div className="text-center">
                                    <img className="img-fluid" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/stadium_1f3df-fe0f.png" alt="Stadium"/>
                                    <h2 className="text-center pt-2 pb-2 text-break fw-bold text-dark">{pista.nombre}</h2>
                                    <p className="fw-light text-break text-body"><b>Tipo:</b> {pista.tipo}</p>
                                    <p className="fw-light text-break text-body"><b>Ubicación:</b> {pista.ubicacion}</p>
                                    <p className="fw-light text-break text-body"><b>Capacidad:</b> {pista.capacidad}</p>
                                </div>      
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}

export default Pistas;

