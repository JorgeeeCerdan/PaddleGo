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
            <h2>Crear una pista nueva</h2>
            <PistaCrear/>
            <h2>Pistas para reservar 🏟️</h2>
            <div>
                {pistasCorrecto && <div><p>{pistasCorrecto}</p></div>}
                {pistasError && <div><p>{pistasError}</p></div>}
            </div>
            <div>
            {   
                pistas.map( pista => (
                    <Link to={`/pista/${pista._id}`} key={pista._id}>
                        <div>
                            <div>
                                <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/stadium_1f3df-fe0f.png" alt="Stadium"/>
                            </div>
                            <div>
                                <p>{pista.nombre}</p>
                                <p>Tipo:{pista.tipo}</p>
                                <p>Ubicación:{pista.ubicacion}</p>
                                <p>Capacidad:{pista.capacidad}</p>
                            </div>
                        </div>
                    </Link>
                ))
            }
            </div>
        </div>
    )
}

export default Pistas;

