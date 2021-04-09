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
        history.go("/reservas")
    }


    return(
        <div>
            <div>
                <label htmlFor="filtroReservas"></label>
                <input  type="text" placeholder="Introduce el numero para buscar una reserva" value={BuscarReserva} onChange={inputReserva}/>
                <button type="submit" onClick={filtrarReservas}>Buscar reserva</button>
                <button type="reset" onClick={resetFilter}>Borrar filtro</button>
            </div>
            <div>
                <h1>{filtroError && <div><p>{filtroError}</p></div>}</h1>
            </div>
            <div> 
                {
                    sacarValor && sacarValor.map(element => (
                        <div key={element._id}>
                            <hr/>
                                <h1>{filtroCorrecto && <div><p>{filtroCorrecto}</p></div>}</h1>
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
                        
                            <hr/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default FiltroReservas;