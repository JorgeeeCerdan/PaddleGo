import React, {useState, useEffect, Fragment} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import NavbarApp from '../NavbarApp.jsx'
import { ACCESS_TOKEN_NAME } from '../../constants/constants.jsx'
import FiltroReservas from './FiltroReservas.jsx'
import moment from "moment"
import 'moment/locale/es'

const Reservas = () =>{

    const [reservas, setReservas] = useState([])
    const [reservasCorrecto, setReservasCorrecto] = useState("")
    const [reservasError, setReservasError] = useState("")

    useEffect(() => {
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers : { Authorization : `Bearer ${token}` }}

        axios.get("http://localhost:5000/reservas", config)
        .then(response => {
            setReservasCorrecto(response.data.message)
            setReservas(response.data.reservas)
        })
        .catch(error => setReservasError(error.response.data.message)) 
    },[])

    return( 
        <Fragment>
            <NavbarApp/>
            <div>
                <button><Link to={"/inicio"}>Boton/icono volver atras</Link></button>
                <h2>Reservas 🎾</h2>
                <div>
                    {reservasCorrecto && <div><p>{reservasCorrecto}</p></div>}
                    {reservasError && <div><p>{reservasError}</p></div>}
                </div>
                <div>
                    <FiltroReservas reservas={reservas}/>
                </div>
                {
                    reservas.map(element => (
                        <div key={element._id}>
                        <div>
                            <img className="pruebaImg" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/stadium_1f3df-fe0f.png" alt=""/>
                        </div>                                
                        <div>
                            <div>
                                <h3>Fecha realizada:</h3>
                                <p>{moment(element.fecha).format('LLLL')}</p>
                            </div>
                            <div>
                                <h3>Codigo de reserva:</h3>
                                <p>{element._id}</p>
                            </div>
                            <div>
                                <h3>Codigo de usuario:</h3>
                                <p>{element.idUsuario}</p>
                            </div>
                            <div>
                                <h3>Codigo de pista:</h3>
                                <p>{element.idPista}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
        </Fragment>
    )
}

export default Reservas;