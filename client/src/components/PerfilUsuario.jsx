import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../constants/constants.jsx';
import axios from 'axios'
import NavbarApp from './NavbarApp.jsx'

const PerfilUsuario = () =>{
    
    const history = useHistory()
    const [perfilUsuario, setPerfilUsuario] = useState([])

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization : `Bearer ${token}` } }

        axios.get(`http://localhost:5000/usuario`, config)
        .then(response => {
            setPerfilCorrecto(response.data.message)
            setTimeout(() => {
                setPerfilUsuario(response.data.usuario)
            }, 1500);
        })
        .catch(error => {
            setPerfilError(error.response.data.usuario)
        })
    },[])

    const handleDelete = () => {
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { header: { Authorization: `Bearer ${token}`}}

        axios.delete(`http://localhost:5000/usuario`, config)
        .then(response => {
            console.log(response.data)
            setPerfilUsuario(response.data)
            history.push("/")
        })
        .catch(error => {
            console.log(error.response.data.usuario)
        })
    }

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        setTimeout(() => {
            history.push("/")
        }, 2500);
    }
    
    // PUT MODIFICAR USUARIO A REALIZAR
    const idModificarUsuario = {
        nombre : "",
        email : "",
        password : "",
        telefono : "",
    }
    const handleChangeValue = () => {

        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers : { Authorization : `Bearer ${token}` }}

        axios.put("", idModificarUsuario, config)
        .then( response => {
            console.log( response.data.message )
        })
        .catch( error => {
            console.log(error.data.message)
        })
    }

    const [perfilError, setPerfilError] = useState("")
    const [perfilCorrecto, setPerfilCorrecto] = useState("")

    return(
        <Fragment>
            <NavbarApp/>
            { perfilError && <div><p>{perfilError}</p></div>}
            { perfilCorrecto && <div><p>{perfilCorrecto}</p></div>}
            <div key={perfilUsuario._id}>
            <div>
                <h2>Nombre completo</h2>
                <p>{perfilUsuario.nombre}</p>
                <button type="submit" onClick={handleChangeValue}>Modificar Nombre</button>
            </div>

            <div>
                <h2>Email</h2>
                <p>{perfilUsuario.email}</p>
            </div>
            
            <div>
                <h2>Password</h2>
                <p>******</p>
            </div>

            <div>
                <h2>Telefono</h2>
                <p>{perfilUsuario.telefono}</p>
            </div>

            <button tpye="submit" onClick={handleLogout}>Cerrar sesión</button>

            <div>
                <h2>Borrar cuenta</h2>
                    <p>Se borrara la cuenta y los datos del usuario ademas de los datos generados por el mismo. ¿Esta seguro de borrar la cuenta?</p>
                    <button type="submit" onClick={handleDelete}>Borrar cuenta</button>
                </div>
        </div>
        </Fragment>
    )
}

export default PerfilUsuario;