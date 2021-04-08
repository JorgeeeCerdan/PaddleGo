import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { ACCESS_TOKEN_NAME } from '../../constants/constants';
import moment from 'moment'
import "moment/locale/es"

const ReservaConcreta = (props) => {

    console.log(props)
    
    const [reservaUnica, setReservaUnica] = useState({
        fecha : "",
        idUsuario: "",
        idPista: ""
    })

    useEffect(() => {
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}
        
        axios.get(`http://localhost:5000/pista/${props.id}` , config)
        .then( response => {
            if (response.data.reserva == null) {
                return console.log("La pista seleccionada no existe")
            }
            console.log(response.data)
            setReservaUnica(response.data)
        })
        .catch( error => console.log( error.response.data.message) )

    }, [props.id])


    return(
        <div key={props.id}>
           <h2>{props.match.params.id}</h2>
           <h2>{moment(reservaUnica.fecha).format('LLLL')}</h2>
           <h2>{reservaUnica.idUsuario}</h2>
           <h2>{reservaUnica.idPista}</h2>
        </div>
    )
}
export default ReservaConcreta;