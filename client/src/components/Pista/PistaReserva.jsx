import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { ACCESS_TOKEN_NAME } from '../../constants/constants';
import axios from 'axios'
import NavbarApp from '../NavbarApp.jsx'
import PistaEditar from '../Pista/PistaEditar.jsx'


const PistaReserva = (props) => {

    const [PistaAReservar ,setPistaAReservar] = useState({
        nombre:"",
        tipo:"",
        ubicacion:"",
        capacidad:""    
    })
    const [realizarReserva, setRealizarReserva] = useState({
        fecha : "",
        idUsuario : "",
        idPista : props.match.params.id
    })
    const history = useHistory()


    useEffect(() => {
        getPista()
    }, [props.match.params.id])

    const getPista = () => {
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}
        
        axios.get(`http://localhost:5000/pista/${props.match.params.id}` , config)
        .then( response => {
            if (response.data.pista == null) {
                return console.log("La pista seleccionada no existe")
            }
            console.log(response.data)
            setPistaAReservar(response.data.pista)
        })
        .catch( error => console.log( error.response.data.message) )
    }

    const [reservaBorrarCorrecto, setReservaBorrarCorrecto] = useState("")
    const [reservaBorrarError, setReservaBorrarError] = useState("")

    const borrarPista = (event) => {
        event.preventDefault();
        const pistaId = {id : event.target.value}
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}      

        axios.delete(`http://localhost:5000/pista/${pistaId.id}`, config)
        .then( response => {
            setReservaBorrarCorrecto(response.data.message)
            setTimeout(() => {
                history.go("/pistas")
            }, 1000);
        })
        .catch( error => setReservaBorrarError(error.response.data.message))
    }

    const [reservaRealizarCorrecto, setReservaRealizarCorrecto] = useState("")
    const [reservaRealizarError, setReservaRealizarError] = useState("")

    const reservar = (event) => {
        event.preventDefault()
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = {headers:{Authorization:`Bearer ${token}`}}
        axios.post("http://localhost:5000/reserva", realizarReserva, config)
        .then(response => {
            setReservaRealizarCorrecto(response.data.message)
            setRealizarReserva(response.data.pista)
            setTimeout(() => {
                history.push("/reservas/usuario")
            }, 1000);
        })
        .catch(error => setReservaRealizarError(error.response.data.message))
    }

    const [editarPistaCorrecto, setEditarPistaCorrecto] = useState("")
    const [editarPistaError, setEditarPistaError] = useState("")

    const editarPista = () => {
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}
    
        axios.put(`http://localhost:5000/pista/${props.match.params.id}`, {...PistaAReservar}, config)
        .then(response => {
            setEditarPistaCorrecto(response.data.message)
            setTimeout(() => {
                history.go("/pistas")
            }, 1000);
        })
        .catch(error => setEditarPistaError(error.response.data))
    }

    return(
        <Fragment>
            <NavbarApp/>
            <div>
                <h2>Pista elegida🏟️</h2>
                <div key={PistaAReservar._id}>
                    <h3>{PistaAReservar.nombre} 🏟️</h3>
                    <p><b>Tipo:</b> {PistaAReservar.tipo}</p>
                    <p><b>Ubicacion:</b> {PistaAReservar.ubicacion}</p>
                    <p><b>Capacidad:</b> {PistaAReservar.capacidad} Personas</p>
                </div>
                <div>
                    <button type="submit" value={props.match.params.id} onClick={reservar}>Realizar reserva</button>
                    <button type="submit" value={props.match.params.id} onClick={borrarPista}>Borrar pista</button>
                    <button type="submit" value={props.match.params.id} onClick={editarPista}>Editar pista</button>
                </div>
                <div>
                    {reservaBorrarCorrecto && <div><p>{reservaBorrarCorrecto}</p></div>}
                    {reservaBorrarError && <div><p>{reservaBorrarError}</p></div>}
                </div>
                <div>
                    {reservaRealizarCorrecto && <div><p>{reservaRealizarCorrecto}</p></div>}
                    {reservaRealizarError && <div><p>{reservaRealizarError}</p></div>}
                </div>
                <div>
                    {editarPistaCorrecto && <div><p>{editarPistaCorrecto}</p></div>}
                    {editarPistaError && <div><p>{editarPistaError}</p></div>}
                </div>
                <PistaEditar datosPista={PistaAReservar} setPistaAReservar={setPistaAReservar}/>
            </div>
        </Fragment>
    )
}

export default PistaReserva;