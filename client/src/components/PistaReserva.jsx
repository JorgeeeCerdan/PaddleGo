import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
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

    // MOSTRAR DATOS DE PISTA A RESERVAR
    useEffect(() => {
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

    }, [props.match.params.id])

    const history = useHistory()

    // BORRAR PISTA
    const borrarPista = (event) => {
        event.preventDefault();
        const pistaId = {
            id : event.target.value
        }
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}      
        axios.delete(`http://localhost:5000/pista/${pistaId.id}`, config)
        .then( response => {
            console.log(response.data)
            history.push("/pistas")
        })
        .catch( error => { 
            console.log(error.response)
        })
    }

    const [realizarReserva, setRealizarReserva] = useState({
        fecha : "",
        idUsuario : "",
        idPista : props.match.params.id
    })
    
    // REALIZAR RESERVA
    const reservar = (event) => {
        event.preventDefault()
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = {headers:{Authorization:`Bearer ${token}`}}
        axios.post("http://localhost:5000/reserva", realizarReserva, config)
        .then(response => {
            console.log(response.data)
            setRealizarReserva(response.data.pista)
            console.log(realizarReserva)
            setTimeout(() => {
                history.push("/reservas/usuario")
            }, 1000);
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    // MODIFICAR PISTA
    const editarPista = () => {
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}
    
        axios.put(`http://localhost:5000/pista/${props.match.params.id}`, {...PistaAReservar}, config)
        .then(response => {
            console.log(response.data)
            console.log("HOLA")
        })
        .catch(error => {
            console.log(error.response.data)
            console.log("ADIOS")
        })

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
                    {/* <h3>¿A que hora quieres jugar?</h3>
                    <div>09:00</div>
                    <div>10:00</div>
                    <div>11:00</div>
                    <div>12:00</div>
                    <div>15:00</div>
                    <div>16:00</div> */}
                </div>
                <div>
                    <button type="submit" value={props.match.params.id} onClick={reservar}>Realizar reserva</button>
                    <button type="submit" value={props.match.params.id} onClick={borrarPista}>Borrar pista</button>
                    <button type="submit" value={props.match.params.id} onClick={editarPista}>Editar pista</button>    
                </div>
            </div>
        </Fragment>
    )
}

export default PistaReserva;