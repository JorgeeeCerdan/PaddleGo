import React, { useState, useEffect } from "react";
import axios from 'axios'
import setAuthToken from "../utility/AuthToken.jsx"
import {ACCESS_TOKEN_NAME} from "../constants/constants.jsx"
import { Link } from "react-router-dom";
import NavbarApp from './NavbarApp.jsx'

const Pistas = () => {

    const [pistas, setPistas] = useState([])

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}
        
        axios.get("http://localhost:5000/pistas", config)
        .then(response => {
            setAuthToken(ACCESS_TOKEN_NAME)
            console.log(response.data.pistas)
            setPistas(response.data.pistas)
        })
        .catch( error => error.response.data.pistas)
    },[])


    return(
        <div>
            <NavbarApp />
            <button><Link to="/Bienvenido">Boton/icono volver atras</Link></button>
            <h2>Pistas 🏟️</h2>
            {   
                pistas.map( pista => (
                    <Link  props={pista._id} key={pista._id} to={`/pista/${pista._id}`}>
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
    )
}

export default Pistas;

