import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavbarApp from './NavbarApp.jsx'
import { ACCESS_TOKEN_NAME } from '../constants/constants.jsx'

const ReservasUsuario = (props) => {

    const [reservasUsuario, setReservasUsuario] = useState([])

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers : { Authorization : `Bearer ${token}` }}

        axios.get(`http://localhost:5000/reservas/usuario`, config)
        .then( response => {
            // if (response.data.reservas.length < 1) console.log("No tienes ninguna pista reservada")
            console.log (response.data.reservas)
            setReservasUsuario(response.data.reservas)
        })
        .catch( error => {
            console.log(error)
        })

    },[])

    return(
        <div>
            <div>
            <NavbarApp/>
            </div>
            <div>
                <h1>Reservas realizadas</h1>  
            </div>
            {
                reservasUsuario.map( reserva => (
                        <div key={reserva._id}>
                            <h2>{reserva.fecha}</h2>
                            <h2>{reserva.idUsuario.nombre}</h2>
                            <h2>{reserva.idPista.nombre}</h2>
                        </div>
                ))
            }
        </div>
    )
}

export default ReservasUsuario;