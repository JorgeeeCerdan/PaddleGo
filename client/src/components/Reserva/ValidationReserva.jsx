import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import moment from "moment"
import 'moment/locale/es'

export default function ValidationReserva({reservas}) {

    const [todasReservas, setTodasReservas] = useState([])
    const [filtroCodigo, setFiltroCodigo] = useState()

    const [filtroCorrecto, setFiltroCorrecto] = useState("")
    const [filtroError, setFiltroError] = useState("")
    
    const inputCodigo = (event) => setTodasReservas(event.target.value)

    const filtroPorCodigo = (event) => {
        event.preventDefault();
        const filtrarCodigoReservas = reservas.find(reserva => reserva.codigoReserva === todasReservas)

        if(!filtrarCodigoReservas){
            setFiltroError("No existe reservas con este codigo")
        }else{
            setFiltroError("")
            setFiltroCorrecto("Resultado de la busqueda")
            setFiltroCodigo(filtrarCodigoReservas)
        }   
    }
    
    const history = useHistory()
    const resetFilter = () => {
        setFiltroCodigo()
        setFiltroError("")
        setTodasReservas("")
        history.push("/reservas")
    }


    return (
        <div className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="text-decoration-none col-12 p-5 mb-5 rounded shadow">
                        <div className="row">
                            <div className="col-6">
                                <label className="form-label fw-bold mb-3 w-100"><h3>Verifica el codigo de la reserva</h3></label>
                                <br/>
                                <input type="text" className="mb-3 w-100" value={todasReservas} onChange={inputCodigo} placeholder="Escribe o pega el codigo de la reserva aquí"/>
                            </div>
                            <div className="col-6">
                                <button type="submit" className="btn btn-primary w-100  mb-3 d-flex justify-content-center" onClick={filtroPorCodigo}>Validar Reserva</button>    
                                <button className="btn btn-outline-primary w-100  mb-3 d-flex justify-content-center" type="reset" onClick={resetFilter}>Borrar filtro</button>
                            </div>
                        </div>
    
                        <div className="mt-3">{filtroError}</div>

                        {filtroCodigo && filtroCorrecto && 
                        
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
                                <tr>
                                    <td>{moment(filtroCodigo.fecha).format('LLLL')}</td>
                                    <td>{filtroCodigo.codigoReserva}</td>
                                    <td>{filtroCodigo.idUsuario}</td>
                                    <td>{filtroCodigo.idPista}</td>
                                </tr>
                            </tbody>
                        </table>
                        } 
                </div>
            </div>
            </div>
        </div>
    )
}
