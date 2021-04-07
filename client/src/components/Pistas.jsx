import React, { useState, useEffect } from "react";
import axios from 'axios'
import setAuthToken from "../utility/AuthToken.jsx"
import {ACCESS_TOKEN_NAME} from "../constants/constants.jsx"
import { Link } from "react-router-dom";
import NavbarApp from './NavbarApp.jsx'
import PistaCrear from "./PistaCrear.jsx";


const Pistas = () => {

    const [pistas, setPistas] = useState([])

    // GET DE TODAS LAS PISTAS
    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}
        
        axios.get("http://localhost:5000/pistas", config)
        .then(response => {
            setAuthToken(ACCESS_TOKEN_NAME)
            console.log(response.data.pistas)
            setPistas(response.data.pistas)
        })
        .catch( error => {
            console.log( error )
        })
    },[])

    return(
        <div>
            <NavbarApp />
            <h2>Crear una pista nueva</h2>
            <PistaCrear/>
            <h2>Pistas para reservar 🏟️</h2>
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

