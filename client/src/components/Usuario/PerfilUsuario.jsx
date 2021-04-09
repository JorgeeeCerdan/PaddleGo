import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../../constants/constants.jsx';
import axios from 'axios'
import NavbarApp from '../NavbarApp.jsx'
import PerfilEditar from './PerfilEditar.jsx';

const PerfilUsuario = () =>{
    const history = useHistory()
    const [perfilUsuario, setPerfilUsuario] = useState([])
    const [perfilError, setPerfilError] = useState("")
    const [perfilCorrecto, setPerfilCorrecto] = useState("")
    
    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization : `Bearer ${token}` } }
        
        axios.get(`http://localhost:5000/usuario`, config)
        .then(response => {
            setPerfilCorrecto(response.data.message)
            setPerfilUsuario(response.data.usuario)
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
    
    return(
        <Fragment>
            <NavbarApp/>
            <div>
                { perfilError && <div><p>{perfilError}</p></div>}
                { perfilCorrecto && <div><p>{perfilCorrecto}</p></div>}
            </div>
            <div key={perfilUsuario._id}>
            <div>
                <h2>Nombre completo</h2>
                <p>{perfilUsuario.nombre}</p>
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

            <PerfilEditar datosUsuario={perfilUsuario} setPerfilUsuario={setPerfilUsuario}/>

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