import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import moment from "moment"
import 'moment/locale/es'

const FiltroReservas = ({reservas}) => {
    
    const todasReservas = reservas
    const [BuscarReserva, setBuscarReserva] = useState([])
    const [sacarValor, setSacarValor] = useState([...todasReservas])
    const [filtroCorrecto, setFiltroCorrecto] = useState("")
    const [filtroError, setFiltroError] = useState("")

    console.log(BuscarReserva)

    
    const inputReserva = (event) => setBuscarReserva(event.target.value)

    const filtrarReservas = (event) => {
        event.preventDefault()
        const filtrarReserva = todasReservas.filter(reserva => reserva._id === BuscarReserva)
        if(filtrarReserva.length === 0){
            setFiltroError("No existe reservas con este codigo")
        }else{
            setFiltroError("")
            setFiltroCorrecto("Resultado de la busqueda:")
            setSacarValor(filtrarReserva)
        }   
    }

    const history = useHistory()
    const resetFilter = () => {
        setSacarValor([])
        setBuscarReserva([])
        setFiltroError("")
        history.push("/reservas")
    }


    return(
        <div>

            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <label htmlFor="filtroUsuarios" className="form-label fw-bold">Buscador de reservas por id de reserva</label>
                        <input className="form-control w-50" type="text" name="usuario" value={BuscarReserva} placeholder="Introduce el id de la reserva" onChange={inputReserva}/>
                        <button className="btn btn-primary w-25" type="submit" onClick={filtrarReservas}>Buscar usuario</button>
                        <button className="btn btn-outline-primary w-25" type="reset" onClick={resetFilter}>Borrar filtro</button>
                    </div>
                </div>
            </div>


            <div className="container-fluid my-5">
                <div className="container">
                        {filtroError && <div><p>{filtroError}</p></div>}
                        {sacarValor && sacarValor.map(reserva => (
                            <div key={reserva._id} className="row bg-light p-5 rounded shadow">
                                {filtroCorrecto && <div><h3>{filtroCorrecto}</h3></div>}
                                <div className="d-flex flex-nowrap">
                                    <div className="col-4 flex-nowrap">
                                        <h4>Reserva realizada a fecha de:</h4>
                                        <p>{moment(reserva.fecha).format("LLL")}</p>
                                    </div>
                                    <div className="col-4 flex-nowrap">
                                        <h4>iD del usuario</h4>
                                        <p>{reserva.idUsuario}</p>
                                    </div>
                                    <div className="col-4 flex-nowrap">
                                        <h4>iD de la Pista</h4>
                                        <p>{reserva.idPista}</p>
                                    </div>                    
                                </div>

                            </div>
                        ))}
                </div>
            </div>

        </div>
    )
}
export default FiltroReservas;