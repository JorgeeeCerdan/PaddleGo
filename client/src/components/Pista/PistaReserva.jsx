import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { ACCESS_TOKEN_NAME, HEROKU_URL } from '../../constants/constants';
import axios from 'axios'
import NavbarApp from '../NavbarApp.jsx'
import PistaEditar from '../Pista/PistaEditar.jsx'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import 'moment/locale/es'

const PistaReserva = (props) => {

    const [PistaAReservar ,setPistaAReservar] = useState({
        nombre:"",
        tipo:"",
        ubicacion:"",
        capacidad:""    
    })
    
    const [reservaBorrarCorrecto, setReservaBorrarCorrecto] = useState("")
    const [reservaBorrarError, setReservaBorrarError] = useState("")
    const [reservaRealizarCorrecto, setReservaRealizarCorrecto] = useState("")
    const [reservaRealizarError, setReservaRealizarError] = useState("")
    const [startDate, setStartDate] = useState();

    const realizarReserva = {
        fecha : startDate,
        idPista : props.match.params.id
    }

    const history = useHistory()
    useEffect(() => {
        getPista()
    }, [props.match.params.id])

    const getPista = () => {
        axios.get(`${HEROKU_URL}/pista/${props.match.params.id}`)
        .then(response => {
            if(response.data.pista == null){
                reservaRealizarError("La pista seleccionada no existe")
            }else{
                setPistaAReservar(response.data.pista)
            }
        }) 
        .catch(error => {
            reservaRealizarError(error.response.message)
        })
    }
    
    const borrarPista = (event) => {
        event.preventDefault();
        const pistaId = {id : event.target.value}
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}      

        axios.delete(`${HEROKU_URL}/pista/${pistaId.id}`, config)
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
        axios.post(`${HEROKU_URL}/reserva`, realizarReserva)
        .then(response => {
            setReservaRealizarCorrecto(response.data.message)
            console.log(response.data)
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

                            <form onSubmit={setStartDate} className="">
                                <label className="form-label mb-3"><b>Reserva hora aqui:</b></label>
                                <br/>
                                <DatePicker
                                    required
                                    inline
                                    className="form-control mb-3"
                                    placeholderText="Decide día y hora"
                                    locale="es"
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    minDate={moment().toDate()}
                                    showTimeSelect
                                    timeCaption="Hora"
                                    timeFormat="HH:mm"
                                    timeIntervals={60}
                                    dateFormat="dd/MM/yyyy h:mm aa"
                                />
                            </form>
                        </div>
                        <div className="col-sm-6">
                            <button className="btn mb-4 w-100 btn-primary" type="submit" value={realizarReserva} onClick={reservar}>Realizar reserva</button>
                            <button className="btn mb-4 w-100 btn-outline-primary" type="submit" value={realizarReserva} onClick={borrarPista}>Borrar pista</button>
                        </div>
                    </div>
                </div>
            </div>

            <PistaEditar datosPista={PistaAReservar} setPistaAReservar={setPistaAReservar}/>

        </Fragment>
    )
}

export default PistaReserva;