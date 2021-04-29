import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import NavbarApp from '../NavbarApp.jsx'
import { HEROKU_URL } from '../../constants/constants.jsx'
import FiltroReservas from './FiltroReservas.jsx'
import moment from "moment"
import 'moment/locale/es'
import ValidationReserva from './ValidationReserva.jsx'

const Reservas = () =>{

    const [reservas, setReservas] = useState([])
    const [reservasCorrecto, setReservasCorrecto] = useState("")
    const [reservasError, setReservasError] = useState("")

    useEffect(() => {
        axios.get(`${HEROKU_URL}/reservas`)
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

                <div className="container-fluid">
                    <div className="container my-5">
                        <h1>Reservas registradas en PaddleGO 🎾</h1>
                        {reservasCorrecto && <div><p className="text-body">{reservasCorrecto}</p></div>}
                        {reservasError && <div><p className="text-body">{reservasError}</p></div>}
                    </div>
                </div>

                <ValidationReserva reservas={reservas}/>
                <FiltroReservas reservas={reservas}/>

                <div className="container-fluid">
                    <div className="container">
                        <table className="table table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Fecha de la reserva</th>
                                    <th scope="col">Codigo de la reserva</th>
                                    <th scope="col">idUsuario</th>
                                    <th scope="col">idPista</th>
                                </tr>
                            </thead>
                            <tbody>
                            {reservas.map( element => (
                                <tr key={element._id}>
                                    <td>{moment(element.fecha).format("LLL")}</td>
                                    <td>{element.codigoReserva}</td>
                                    <td>{element.idUsuario}</td>
                                    <td>{element.idPista}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Reservas;