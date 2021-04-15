import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../../constants/constants.jsx';
import axios from 'axios'
import NavbarApp from '../NavbarApp.jsx'
import PerfilEditar from './PerfilEditar.jsx';
import CerrarSesion from './CerrarSesion.jsx';
import BorrarUsuario from './BorrarUsuario.jsx';

const PerfilUsuario = () =>{
    const history = useHistory()
    const [perfilUsuario, setPerfilUsuario] = useState([])
    const [perfilCorrecto, setPerfilCorrecto] = useState("")
    const [perfilError, setPerfilError] = useState("")
    
    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization : `Bearer ${token}` } }
        
        axios.get(`http://localhost:5000/usuario`, config)
        .then(response => {
            setPerfilUsuario(response.data.usuario)
            console.log(response.data.message)
            setPerfilCorrecto(response.data.message)
            history.push("/usuario")
        })
        .catch(error => {
            setPerfilError(error.response.data.usuario)
        })
    },[])
    
    
    return(
        <Fragment>
            <NavbarApp/>

            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-4 mb-5 mt-2 ">
                            {perfilCorrecto && <h1 className="fw-bold">{perfilCorrecto}</h1>}
                            {perfilError && <h1 className="fw-bold">{perfilError}</h1>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="container">
                    <div className="row bg-light p-5 rounded shadow" key={perfilUsuario._id}>
                        <div className="col-sm-12 col-md-6 col-lg-4  flex-fill" >
                            <h3>Nombre completo</h3>
                            <p>{perfilUsuario.nombre}</p>
                            <h3>Email</h3>
                            <p>{perfilUsuario.email}</p>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4  flex-fill" >
                            <h3>Password</h3>
                            <p>******</p>
                            <h3>Telefono</h3>
                            <p>{perfilUsuario.telefono}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <PerfilEditar datosUsuario={perfilUsuario} setPerfilUsuario={setPerfilUsuario}/>
            <CerrarSesion />
            <BorrarUsuario setPerfilUsuario={setPerfilUsuario} perfilUsuario={perfilUsuario}/>

        </Fragment>
    )
}

export default PerfilUsuario;