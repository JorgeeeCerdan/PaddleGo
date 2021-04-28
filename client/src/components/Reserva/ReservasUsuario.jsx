import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavbarApp from '../NavbarApp.jsx'
import { HEROKU_URL } from '../../constants/constants.jsx'
import { useHistory } from 'react-router'
import moment from 'moment'
import 'moment/locale/es'


const ReservasUsuario = () => {

    const [reservasUsuario, setReservasUsuario] = useState([])
    const [reservasUsuarioCorrecto, setReservasUsuarioCorrecto] = useState("")
    const [reservasUsuarioError, setReservasUsuarioError] = useState("")
    const [reservasUsuarioDeleteCorrecto, setReservasUsuarioDeleteCorrecto] = useState("")
    const [reservasUsuarioDeleteError, setReservasUsuarioDeleteError] = useState("")
    console.log(reservasUsuario)
    
    useEffect(() => {
        axios.get(`${HEROKU_URL}/reservas/usuario`)
        .then( response => {
            if(response.data.reservas.length <= 0) return setReservasUsuarioError("No tienes ninguna pista reservada")
            setReservasUsuario(response.data.reservas)
            setReservasUsuarioCorrecto(response.data.message)
        })
        .catch( error => {
            setReservasUsuarioError(error.response.data.message)
        })
    },[])    

    const history = useHistory()
    const handleBorrarReserva = (event) => {
        event.preventDefault();
        const idBorrarReserva = {id : event.target.value}
        
        axios.delete(`${HEROKU_URL}/reserva/${idBorrarReserva.id}`)
        .then(response => {
            setReservasUsuarioDeleteCorrecto(response.data.message)
            setTimeout(() => {
                history.push("/inicio")
            }, 1000);
        })
        .catch(error => {
            setReservasUsuarioDeleteError(error.response.data.message)
        })
    }
    
    return(
        <div>
            <NavbarApp/>

            <div className="container-fluid">
                <div className="container my-3">
                    <h1>Reservas realizadas</h1>
                    {reservasUsuarioCorrecto && <div><p className="fw-bold">{reservasUsuarioCorrecto}</p></div>}
                    {reservasUsuarioError && <div><p className="fw-bold">{reservasUsuarioError}</p></div>}
                    {reservasUsuarioDeleteCorrecto && <div className="alert alert-success py-4"><p>{reservasUsuarioDeleteCorrecto}</p></div>}
                    {reservasUsuarioDeleteError && <div className="alert alert-danger py-4"><p>{reservasUsuarioDeleteError}</p></div>}
                </div>
            </div>

            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        {reservasUsuario && reservasUsuario.map( reserva => (
                            <div key={reserva._id} className="text-decoration-none col-sm-12 col-md-6 col-lg-4 p-5 m-4 rounded shadow flex-fill">
                                <div>
                                    <p><b>Dia y hora de la reserva</b></p>
                                    <p className="text-body">{moment(reserva.fecha).format('LLL')}</p>
                                    <p><b>Pista reservada</b></p>
                                    <p className="text-body">{reserva.idPista.nombre} - {reserva.idPista.ubicacion} - {reserva.idPista.tipo} - {reserva.idPista.capacidad} Personas</p>
                                </div>

                                <div>
                                    <button className="btn btn-outline-primary w-100" type="submit" value={reserva._id} onClick={handleBorrarReserva}>Borrar reserva</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ReservasUsuario;