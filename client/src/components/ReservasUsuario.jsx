import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavbarApp from './NavbarApp.jsx'
import { ACCESS_TOKEN_NAME } from '../constants/constants.jsx'
import { useHistory } from 'react-router'

const ReservasUsuario = () => {

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

    const history = useHistory()
    const handleBorrarReserva = (event) => {
        event.preventDefault();
        
        const idBorrarReserva = {
            id : event.target.value
        }

        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}

        axios.delete(`http://localhost:5000/reserva/${idBorrarReserva.id}`, config)
        .then( response => {
            console.log(response.data.message)
            setTimeout(() => {
                history.go("/reservas/usuario")
            }, 1000);
        })
        .catch( error => {
            console.log(error.response.data.message)
        })
    }

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
                        <div>
                            <h2>{reserva.fecha}</h2>
                            <h2>{reserva.idUsuario.nombre}</h2>
                            <h2>{reserva.idPista.nombre}</h2>
                        </div>
                        <div>
                            <button type="submit" value={reserva._id} onClick={handleBorrarReserva}>Borrar reserva</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ReservasUsuario;