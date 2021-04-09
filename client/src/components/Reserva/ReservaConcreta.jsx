import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { ACCESS_TOKEN_NAME } from '../../constants/constants';
import moment from 'moment'
import "moment/locale/es"

const ReservaConcreta = (props) => {

    console.log(props)
    console.log("ESTOY AQUI")

    const [reservaUnica, setReservaUnica] = useState({
        fecha : "",
        idUsuario: "",
        idPista: ""
    })
    const [reservaConcreataCorrecto, setReservaConcreataCorrecto] = useState("")
    const [reservaConcretaError, setReservaConcretaError] = useState("")
    
    useEffect(() => {
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}
        
        axios.get(`http://localhost:5000/pista/${props.match.params.id}` , config)
        .then( response => {
            if (response.data.reserva == null) {
                return setReservaConcretaError("La pista seleccionada no existe")
            }
            setReservaConcreataCorrecto(response.data.message)
            setReservaUnica(response.data)
            console.log(response.data)
        })
        .catch( error => setReservaConcretaError(error.response.data.message) )

    }, [props.match.params.id])


    return(
        <div>
            <div>
                {reservaConcreataCorrecto && <div><p>{reservaConcreataCorrecto}</p></div>}
                {reservaConcretaError && <div><p>{reservaConcretaError}</p></div>}
            </div>
            <div key={props.id}>
               <h2>{props.match.params.id}</h2>
               <h2>{moment(reservaUnica.fecha).format('LLLL')}</h2>
               <h2>{reservaUnica.idUsuario}</h2>
               <h2>{reservaUnica.idPista}</h2>
            </div>
        </div>
    )
}
export default ReservaConcreta;