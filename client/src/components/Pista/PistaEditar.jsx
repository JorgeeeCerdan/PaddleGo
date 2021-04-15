import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { ACCESS_TOKEN_NAME } from '../../constants/constants.jsx'
import axios from 'axios'

const PistaEditar = ({datosPista, setPistaAReservar}) => {

    const infoPista = datosPista
    const [pistaModificada, setPistaModificada] = useState({})
    const [pistaModificadaCorrecto, setPistaModificadaCorrecto] = useState("")
    const [pistaModificadaError, setPistaModificadaError] = useState("")
    const history = useHistory()

    const modificarPista = (event) => {
        event.preventDefault()
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}
    
        axios.put(`http://localhost:5000/pista/${infoPista._id}`, pistaModificada, config)
        .then(response => {
            setPistaModificadaCorrecto(response.data.message)
            setPistaAReservar(response.data.pistaActualizada)
            setTimeout(() => {
                history.push("/pistas")
            }, 1500);
        })  
        .catch(error => setPistaModificadaError(error.response.data.message))
    }

    const changeInputs = (event) => setPistaModificada({
        ...pistaModificada,
        [event.target.name] : event.target.value
    })

    const resetForm = () => setPistaModificada("")

    return(
        <div>
            <div className="container">
                <div className="row">
                    {pistaModificadaCorrecto && <div className="alert alert-success py-4"><p lassName="fw-bold">{pistaModificadaCorrecto}</p></div>}
                    {pistaModificadaError && <div className="alert alert-danger py-4"><p className="fw-bold">{pistaModificadaError}</p></div>}
                </div>
            </div>

            <div className="container-fluid my-4">
                <div className="container">
                    <form action="PUT">
                        <div className="row bg-light p-5 rounded shadow">
                                <h2 className="pb-4">Formulario de modificacion de pista</h2>
                            <div className="col-sm-12 col-md-6">
                                <label className="form-label fw-bold" htmlFor="nombre">Nombre de la pista</label>
                                <input className="form-control mb-4" type="text" id="nombre" name="nombre" placeholder={infoPista.nombre} value={pistaModificada.nombre} onChange={changeInputs}/>
                                
                                <label className="form-label fw-bold" htmlFor="tipo">Tipo de pista</label>
                                <input className="form-control mb-4" type="text" id="tipo" name="tipo" placeholder={infoPista.tipo}  value={pistaModificada.tipo} onChange={changeInputs}/>
                                
                                <label className="form-label fw-bold" htmlFor="ubicación">Ubicación</label>
                                <input className="form-control mb-4" type="text" id="ubicacion" name="ubicacion" placeholder={infoPista.ubicacion} value={pistaModificada.ubicacion} onChange={changeInputs}/>
                            </div>

                            <div className="col-sm-12 col-md-6">
                                <label className="form-label fw-bold" htmlFor="capacidad">Capacidad</label>
                                <input className="form-control mb-4" type="text" id="capacidad" name="capacidad" placeholder={infoPista.capacidad + ` Personas`} value={pistaModificada.capacidad} onChange={changeInputs}/>

                                <div className="row mt-5">
                                    <p><b>Estado de la pista</b></p>
                                    <div className="col-6">
                                        <label className="px-3" htmlFor="estado"> Libre </label>
                                        <input className="form-check-input" required type="radio" name="estado" value={true} onChange={changeInputs} />
                                    </div>
                                    <div className="col-6">
                                        <label className="px-3" htmlFor="estado"> Ocupada </label>
                                        <input className="form-check-input" required type="radio" name="estado" value={false} onChange={changeInputs} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 text-center">
                                <button className="btn w-100 mt-4 btn-primary"  type="submit" onClick={modificarPista}>Modificar pista</button>
                                <button className="btn w-100 mt-4 btn-outline-primary" type="reset" onClick={resetForm}> Resetear formulario</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PistaEditar;