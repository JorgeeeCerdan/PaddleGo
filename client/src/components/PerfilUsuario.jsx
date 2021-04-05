import React, { useState, useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../constants/constants.jsx';
import axios from 'axios'
import NavbarApp from './NavbarApp.jsx'

const PerfilUsuario = (props) =>{

    const [perfilUsuario, setPerfilUsuario] = useState([])

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization : `Bearer ${token}` } }

        axios.get(`http://localhost:5000/usuario`, config)
        .then(response => {
            console.log(response.data)
            setPerfilUsuario(response.data.usuario)
        })
        .catch(error => error.response.data.usuario)
    },[])

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/usuario/${props.match.params.id}`)
        .then(response => {
            console.log(response.data.usuario.message)
            setPerfilUsuario(response.data.usuario)
            localStorage.removeItem(ACCESS_TOKEN_NAME)
        })
        .catch(error => {
            console.log(error.response.data.usuario)
        })
    }


    const history = useHistory()
    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        setTimeout(() => {
            history.push("/")
        }, 2500);
    }


    return(
        <Fragment>
            <NavbarApp/>
            <button><Link to="/Bienvenido">Boton/icono volver atras</Link></button>
            <div key={perfilUsuario._id}>

            <div>
                <h2>Nombre completo</h2>
                <p>{perfilUsuario.nombre}</p>
                <button type="submit" >Modificar Nombre</button>
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

            <button tpye="submit" onClick={handleLogout}><Link>Cerrar sesión</Link></button>

            <div>
                <h2>Borrar cuenta</h2>
                    <p>Se borrara la cuenta y los datos del usuario ademas de los datos generados por el mismo. ¿Esta seguro de borrar la cuenta?</p>
                    <button type="submit" onClick={handleDelete}><Link to="/login">Borrar cuenta</Link></button>
                </div>
        </div>
        </Fragment>
    )
}

export default PerfilUsuario;