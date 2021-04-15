import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import { ACCESS_TOKEN_NAME, HEROKU_URL } from '../../constants/constants';
import axios from 'axios'

const PerfilEditar = (props) =>{
    
    const [usuarioModificado, setUsuarioModificado] = useState({})
    const [modificacionCorrecta, setModificacionCorrecta] = useState("")
    const [modificacionError, setModificacionError] = useState("")

    const history = useHistory()
    const modificarUsuario =  (event) => {
        event.preventDefault()

        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = {headers:{Authorization : `Bearer ${token}`}}

        axios.put(`${HEROKU_URL}/usuario`, usuarioModificado, config)
        .then(response => {
            setTimeout(() => {
                props.setPerfilUsuario(response.data.bodyActualizado)
                setModificacionCorrecta(response.data.message)
                history.push("/usuario")
            }, 1000);
        })
        .catch(error => setModificacionError(error.response.data.message))

    }
        const inputsUsuario = (event) => {
            setUsuarioModificado({
                ...usuarioModificado,
                [event.target.name] : event.target.value
            })
        }

        const resetFormModificarUsuario = (event) => {
            event.preventDefault()
            setUsuarioModificado({
                nombre : "",
                email : "",
                password : "",
                telefono : "",
            })
        }

    return(
        <div>
            <div className="container-fluid">
                <div className="container my-5">
                    <h1>Modificar perfil</h1>
                    <p className="text-body">En caso de que te equivocaras al registrarte, con este formulario podras modificar los datos de tu perfil</p>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {modificacionCorrecta && <div className="alert alert-success py-4"><strong>{modificacionCorrecta}</strong></div>}
                    {modificacionError && <div className="alert alert-danger py-4"><strong>{modificacionError}</strong></div>}
                </div>
            </div>
            <div className="container-fluid">
                <div className="container">
                    <form action="PUT">
                        <div className="row bg-light p-5 rounded shadow">
                            <h2 className="pb-3">Formulario de modificación de perfil de usuario</h2>
                            <div className="col-sm-12 col-md-6">
                                <label className="form-label fw-bold" htmlFor="nombre">Nombre: </label>
                                <input className="form-control mb-4" type="text" name="nombre" id="nombre" placeholder="Introduce un nuevo nombre de usuario"value={usuarioModificado.nombre}onChange={inputsUsuario}/>
                                <label className="form-label fw-bold" htmlFor="email">Email: </label>
                                <input className="form-control mb-4" type="email" name="email" id="email" placeholder="Introduce un email nuevo"value={usuarioModificado.email}onChange={inputsUsuario}/>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <label className="form-label fw-bold" htmlFor="password">Password: </label>
                                <input className="form-control mb-4" type="password" name="password" id="password" placeholder= "Introduce una password nueva" value={usuarioModificado.password}onChange={inputsUsuario}/>
                                <label className="form-label fw-bold" htmlFor="telefono">Telefono: </label>
                                <input className="form-control mb-4" type="telefono" name="telefono" id="telefono" placeholder= "Introduce un numero de telefono nuevo" value={usuarioModificado.telefono}onChange={inputsUsuario}/>
                            </div>
                            <div className="col-12 mt-3 text-center">
                                <button className="btn mx-3 my-2 btn-primary" type="submit" onClick={modificarUsuario}>Modificar usuario</button>
                                <button className="btn mx-3 my-2 btn-outline-primary" type="reset" onClick={resetFormModificarUsuario}>Borrar formulario</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PerfilEditar;