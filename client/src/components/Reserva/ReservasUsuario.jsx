import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavbarApp from '../NavbarApp.jsx'
import { ACCESS_TOKEN_NAME } from '../../constants/constants.jsx'
import { useHistory } from 'react-router'
import moment from 'moment'
import 'moment/locale/es'

const ReservasUsuario = () => {

    const [reservasUsuario, setReservasUsuario] = useState([])

    const [reservasUsuarioCorrecto, setReservasUsuarioCorrecto] = useState("")
    const [reservasUsuarioError, setReservasUsuarioError] = useState("")
    const [reservasUsuarioDeleteCorrecto, setReservasUsuarioDeleteCorrecto] = useState("")
    const [reservasUsuarioDeleteError, setReservasUsuarioDeleteError] = useState("")

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers : { Authorization : `Bearer ${token}` }}

        axios.get(`http://localhost:5000/reservas/usuario`, config)
        .then( response => {
            if (response.data.reservas.length <= 0) {
                setReservasUsuarioError("No tienes ninguna pista reservada")
            }else{
                setReservasUsuario(response.data.reservas)
                setReservasUsuarioCorrecto(response.data.message)
            }
        })
        .catch( error => {
            setReservasUsuarioError(error.response.data.message)
        })
    },[])    

    const history = useHistory()
    const handleBorrarReserva = (event) => {
        event.preventDefault();
        const idBorrarReserva = {id : event.target.value}
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}
        
        axios.delete(`http://localhost:5000/reserva/${idBorrarReserva.id}`, config)
        .then(response => {
            setReservasUsuarioDeleteCorrecto(response.data.message)
            setTimeout(() => {
                history.go("/reservas/usuario")
            }, 1000);
        })
        .catch(error => {
            setReservasUsuarioDeleteError(error.response.data.message)
        })
    }
    
    return(
        <div>
            <div>
            <NavbarApp/>
            </div>
            <div>
                <h1>Reservas realizadas por ti.</h1>  
            </div>
            <div>
                {reservasUsuarioCorrecto && <div><p>{reservasUsuarioCorrecto}</p></div>}
                {reservasUsuarioError && <div><p>{reservasUsuarioError}</p></div>}
            </div>
            <div>
                {reservasUsuarioDeleteCorrecto && <div><p>{reservasUsuarioDeleteCorrecto}</p></div>}
                {reservasUsuarioDeleteError && <div><p>{reservasUsuarioDeleteError}</p></div>}
            </div>

            {
                reservasUsuario.map( reserva => (
                    <div key={reserva._id}>
                        <div>
                            <h2>{moment(reserva.fecha).format('LLL')}</h2>
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