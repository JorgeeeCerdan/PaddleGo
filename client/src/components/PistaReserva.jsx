import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ACCESS_TOKEN_NAME } from '../constants/constants.jsx'
import NavbarApp from './NavbarApp.jsx'

const PistaReserva = (props) => {

    const [PistaAReservar ,setPistaAReservar] = useState({
        nombre:"",
        tipo:"",
        ubicacion:"",
        capacidad:""    
    })

    useEffect(() => {
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}
        
        axios.get(`http://localhost:5000/pista/${props.match.params.id}` , config)
        .then( response => {
            console.log(response.data)
            setPistaAReservar(response.data.pista)
        })
        .catch( error => error.response.data.message)

    }, [props.match.params.id])

    return(
        <Fragment>
            <NavbarApp/>
            <div>
            <button><Link to="/Bienvenido">Boton/icono volver atras</Link></button>
                <h2>Pista elegida🏟️</h2>

                <div>
                    <h3>{PistaAReservar.nombre} 🏟️</h3>
                    <p><b>Tipo:</b> {PistaAReservar.tipo}</p>
                    <p><b>Ubicacion:</b> {PistaAReservar.ubicacion}</p>
                    <p><b>Capacidad:</b> {PistaAReservar.capacidad} Personas</p>
                </div>

                <div>
                    <h3>¿A que hora quieres jugar?</h3>
                    <div>09:00</div>
                    <div>10:00</div>
                    <div>11:00</div>
                    <div>12:00</div>
                    <div>15:00</div>
                    <div>16:00</div>
                    <button>Realizar reserva</button>
                </div>
            </div>
        </Fragment>
    )
}

export default PistaReserva;