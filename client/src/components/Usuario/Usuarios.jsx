import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios'
import NavbarApp from '../NavbarApp.jsx'
import FiltroUsuarios from './FiltroUsuarios.jsx';
import { ACCESS_TOKEN_NAME } from '../../constants/constants';

const Usuarios = () =>{

    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = {headers:{Authorization:`Bearer ${token}`}}
        axios.get("http://localhost:5000/usuarios", config)
        .then(response => {
            setUsuarios(response.data.usuarios)
            setUsuariosCorrecto(response.data.message)
        })
        .catch(error =>{
            setUsuariosError(error.response.data.message)
        })
    },[])

    const [usuariosCorrecto, setUsuariosCorrecto] = useState("")
    const [usuariosError, setUsuariosError] = useState("")

    return(
        <Fragment>
        <NavbarApp/>
        <div>

            <div className="container-fluid">
                <div className="container my-5">
                    <h1>Usuarios registrados en PaddleGO 👤</h1>
                    {usuariosCorrecto && <div><p className="text-body">{usuariosCorrecto}</p></div>}
                    {usuariosError && <div><p className="text-body">{usuariosError}</p></div>}
                </div>
            </div>

            <FiltroUsuarios usuarios={usuarios}/>

            <div className="container-fluid">
                <div className="container">
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Telefono</th>
                                <th scope="col">Password</th>
                            </tr>
                        </thead>
                        <tbody>
                        {usuarios.map( element => (
                            <tr key={element._id}>
                                <td>{element._id}</td>
                                <td>{element.nombre}</td>
                                <td>{element.email}</td>
                                <td>{element.telefono}</td>
                                <td>*****</td>
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

export default Usuarios;