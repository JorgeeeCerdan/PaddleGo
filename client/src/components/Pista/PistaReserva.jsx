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
    
    const [reservaBorrarCorrecto, setReservaBorrarCorrecto] = useState("")
    const [reservaBorrarError, setReservaBorrarError] = useState("")
    const [reservaRealizarCorrecto, setReservaRealizarCorrecto] = useState("")
    const [reservaRealizarError, setReservaRealizarError] = useState("")

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
    
    const borrarPista = (event) => {
        event.preventDefault();
        const pistaId = {id : event.target.value}
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}      

        axios.delete(`http://localhost:5000/pista/${pistaId.id}`, config)
        .then( response => {
            setReservaBorrarCorrecto(response.data.message)
            setTimeout(() => {
                history.push("/pistas")
            }, 1000);
        })
        .catch( error => setReservaBorrarError(error.response.data.message))
    }


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

    return(
        <Fragment>
            <NavbarApp/>
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div>
                            {reservaBorrarCorrecto && <div className="alert alert-success py-4"><p>{reservaBorrarCorrecto}</p></div>}
                            {reservaBorrarError && <div className="alert alert-danger py-4"><p>{reservaBorrarError}</p></div>}
                            {reservaRealizarCorrecto && <div className="alert alert-success py-4"><p>{reservaRealizarCorrecto}</p></div>}
                            {reservaRealizarError && <div className="alert alert-danger py-4"><p>{reservaRealizarError}</p></div>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid my-4">
                <div className="container">
                    <div className="row bg-light p-5 rounded shadow" key={PistaAReservar._id}>
                        <h1>Pista elegida 🏟️</h1>
                        <div className="col-sm-6">
                            <h3>{PistaAReservar.nombre}</h3>
                            <p><b>Tipo: </b>{PistaAReservar.tipo}</p>
                            <p><b>Ubicación: </b>{PistaAReservar.ubicacion}</p>
                            <p><b>Capacidad: </b>{PistaAReservar.capacidad} Personas</p>
                        </div>
                        <div className="col-sm-6">
                            <button className="btn mb-4 w-100 btn-primary" type="submit" value={props.match.params.id} onClick={reservar}>Realizar reserva</button>
                            <button className="btn mb-4 w-100 btn-outline-primary" type="submit" value={props.match.params.id} onClick={borrarPista}>Borrar pista</button>
                        </div>
                    </div>
                </div>
            </div>

            <PistaEditar datosPista={PistaAReservar} setPistaAReservar={setPistaAReservar}/>

        </Fragment>
    )
}

export default PistaReserva;