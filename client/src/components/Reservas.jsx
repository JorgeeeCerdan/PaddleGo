import React, {useState, useEffect, Fragment} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import NavbarApp from './NavbarApp.jsx'
import { ACCESS_TOKEN_NAME } from '../constants/constants.jsx'

const Reservas = () =>{
    const [reservas, setReservas] = useState([])

    useEffect(() => {
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers : { Authorization : `Bearer ${token}` }}

        axios.get("http://localhost:5000/reservas", config)
        .then(res => {
            console.log(res.data)
            setReservas(res.data.reservas)
        })
        .catch(error => console.log(error.response.data.reservas))
    },[])

    // const filtrarReserva = () => {
    //     // reservas.filter( reserva => handleInput === event)
    // }

    // const handleInput = (event) => {
    //     setReservas({...reservas, [event.targe.name]: event.target.value})
    // }
    
    return( 
        <Fragment>
            <NavbarApp/>
            <div>
                <button><Link to={"/inicio"}>Boton/icono volver atras</Link></button>
                <h2>Reservas 🎾</h2>
                {
                /* <input type="text" placeholder="Busca una reserva en concreto" name="reserva"/>
                <button type="submit" onClick={filtrarReserva}>Buscar reserva concreta</button> */
                }
                {
                    reservas.map(element => (
                        <div key={element._id}>
                        <div>
                            <img className="pruebaImg" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/stadium_1f3df-fe0f.png" alt=""/>
                        </div>                                
                        <div>
                            <p>{element.fecha}</p>
                            <p>{element.idUsuario}</p>
                            <p>{element.idPista}</p>
                        </div>
                    </div>
                ))
            }
            </div>
        </Fragment>
    )
}

export default Reservas;