import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios'
import NavbarApp from '../NavbarApp.jsx'
import FiltroUsuarios from './FiltroUsuarios.jsx';
import { ACCESS_TOKEN_NAME } from '../../constants/constants';

const Usuarios = () =>{

    const [usuarios, setUsuarios] = useState([])
    console.log(usuarios)

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
            <h2>Usuarios registrados en PaddleGO 👤</h2>
            { usuariosCorrecto && <div><p>{usuariosCorrecto}</p></div>}
            { usuariosError && <div><p>{usuariosError}</p></div>}
                <FiltroUsuarios usuarios={usuarios}/>
            <div>
                {
                    usuarios.map( element => (
                        <div key={element._id}>
                        <div>
                            <div>
                                <h3>Nombre completo</h3>
                                <p>{element.nombre}</p>
                            </div>
                            <div>
                                <h3>Correo electronico</h3>
                                <p>{element.email}</p>
                            </div>
                            <div>
                                <h3>Password</h3>
                                <p>*****</p>
                            </div>
                            <div>
                                <h3>Telefono</h3>
                                <p>{element.telefono}</p>
                            </div>
                        </div>
                        <div>
                            <h3>Borrar cuenta</h3>
                            <p>Se borrara la cuenta y todos los datos del usuario ademas de los generados por el mismo. ¿Esta seguro de borra la cuenta?</p>
                            <button>Borrar cuenta</button>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
        </Fragment>
    )

}

export default Usuarios;