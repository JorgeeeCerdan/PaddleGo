import axios from 'axios'
import React, { useState } from 'react'
import { ACCESS_TOKEN_NAME } from '../../constants/constants.jsx';
import { useHistory } from 'react-router';

const PistaCrear = () => {

    const [crearPista, setCrearPista] = useState({
        nombre : "",
        estado : "",
        tipo : "",
        ubicacion : "",
        capacidad : ""
    })

    const [crearPistCorrecto, setCrearPistCorrecto] = useState("")
    const [crearPistaError, setCrearPistaError] = useState("")

    const history = useHistory()
    const handleCrearPista = (e) => {
        e.preventDefault();
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}
    
        axios.post("http://localhost:5000/pista", {...crearPista}, config)
        .then( response => {
            setCrearPistCorrecto(response.data.message)
            setCrearPista(response.data.pista)
            setTimeout(() => {
                history.go("/pistas")
            }, 100);
        })
        .catch( error => { 
            setCrearPistaError(error.response.data.message)
        })
    }
        
    const changeInputs = (event) => setCrearPista({
        ...crearPista,
        [event.target.name]: event.target.value
    })

    const resetFormCrearPista = (event) => {
        event.preventDefault()
        setCrearPista({
            nombre : "",
            estado : "",
            tipo : "",
            ubicacion : "",
            capacidad : ""
        })
    } 

    return(
        <div>

            <div className="container-fluid">
                <div className="container my-5">
                    <h1>Crear una pista nueva</h1>
                    <p className="text-body">Rellena este formulario para crear una pista nueva</p>
                </div>
            </div>

            <div className="container">
                <div className="row">
                {crearPistCorrecto && <div className="alert alert-success py-4"><strong>{crearPistCorrecto}</strong></div>}
                {crearPistaError && <div className="alert alert-danger py-4"><strong>{crearPistaError}</strong></div>}
                </div>
            </div>

            <div className="container-fluid">
                <div className="container">
                    <form action="POST">
                        <div className="row bg-light p-5 rounded shadow">
                            <h2 className="pb-4">Formulario de creacion de pista</h2>
                        <div className="col-sm-12 col-md-6">
                            <label htmlFor="nombre" className="form-label fw-bold" >Nombre de pista</label>
                            <input required className="form-control mb-4" type="text" placeholder="Nombre de pista" name="nombre" value={crearPista.nombre} onChange={changeInputs} />
                            <label htmlFor="tipo" className="form-label fw-bold" >Tipo de pista</label>
                            <input required className="form-control mb-4" type="text" placeholder="Tipo de pista" name="tipo" value={crearPista.tipo} onChange={changeInputs} />
                            <label htmlFor="ubicacion" className="form-label fw-bold" >Ubicacion de la pista</label>
                            <input required className="form-control mb-4" type="text" placeholder="Ubicacion de la pista" name="ubicacion" value={crearPista.ubicacion} onChange={changeInputs} />
                        </div>

                        <div className="col-sm-12 col-md-6">
                            <label htmlFor="capacidad" className="form-label fw-bold" >Capacidad</label>
                            <input required className="form-control mb-4" type="text" placeholder="Numero de personas en pista" name="capacidad" value={crearPista.capacidad} onChange={changeInputs} />                
                           
                            <div className="row mt-5">
                                <p><b>Estado incial de la pista</b></p>
                                <div className="col-6 text-center">
                                    <label className="px-3" htmlFor="estado">Libre</label>
                                    <input className="form-check-input" required type="radio" placeholder="Estado de la pista" name="estado" value={true} onChange={changeInputs} />
                                </div>
                                <div className="col-6 text-center">
                                    <label className="px-3" htmlFor="estado">Ocupada</label>
                                    <input className="form-check-input" required type="radio" placeholder="Estado de la pista" name="estado" value={false} onChange={changeInputs} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 text-center">
                                <button className="btn w-100 mt-4 btn-primary"  type="submit" onClick={handleCrearPista}> Crear pista</button>
                                <button className="btn w-100 mt-4 btn-outline-primary" type="reset" onClick={resetFormCrearPista}> Resetear formulario</button>
                            </div>
                        </div>

                        </div>
                    </form>


                </div>
            </div>


        </div>
    )
}

export default PistaCrear;