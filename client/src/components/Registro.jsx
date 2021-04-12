import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import {ACCESS_TOKEN_NAME} from "../constants/constants.jsx"
import setAuthToken from '../utility/AuthToken.jsx';
import NavbarHome from './NavbarHome.jsx';
import Footer from './Footer.jsx';

const Registro = () => {

    const [userRegister, setUserRegister] = useState({
        nombre: "",
        email: "",
        password: "",
        telefono: ""
    })
        
    const [errorRegister, setErrorRegister] = useState("")
    const [correctRegister, setCorrectRegister] = useState("")

    const changeInputs = (event) => {
        setUserRegister({ ...userRegister, [event.target.name]: event.target.value})
    }

    const history = useHistory()
    const submitForm = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/registro', {...userRegister})
        .then( response => {
            setCorrectRegister(response.data.message)
            setAuthToken(response.data.token)
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token)
            setTimeout(() => {
                history.push("/inicio")                
            }, 1000);
        })
        .catch( error => {
            setErrorRegister(error.response.data.message)
            console.log(error.response.data.message)
        })
    }

    const resetFormRegistro = (event) => {
        event.preventDefault()
        setUserRegister({
            nombre: "",
            email: "",
            password: "",
            telefono: ""
        })
        setErrorRegister("")
    }

    return(
        <div>
            <div className="container-fluid">
                <div className="container my-5">
                    <h1>Cuentanos sobre ti 📝</h1>
                    <p className="text-body">Rellena los campos necesarios para crear tu cuenta</p>
                </div>
            </div>

            <div className="container">
                <div className="row">
                {correctRegister && <div className="alert alert-success py-4"><strong>{correctRegister}</strong></div>}
                {errorRegister && <div className="alert alert-danger py-4"><strong>{errorRegister}</strong></div>}
                </div>
            </div>

            <div className="container-fluid">
                <div className="container">
                    <form action="POST" onSubmit={submitForm} >
                        <div className="row bg-light p-5 rounded shadow">
                        <h2 className="pb-4">Formulario de registro</h2>
                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="nombre" class="form-label fw-bold" >Nombre de usuario</label>
                                <input required className="form-control mb-4"  type="text" placeholder="Nombre completo" name="nombre" value={userRegister.nombre} onChange={changeInputs}/>
                                <label htmlFor="email" class="form-label fw-bold" >Correo electronico</label>
                                <input required className="form-control mb-4" type="email" placeholder="Email" name="email" value={userRegister.email} onChange={changeInputs}/>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="password" class="form-label fw-bold" >Contraseña</label>
                                <input required className="form-control mb-4" type="password"placeholder="Passoword"name="password"value={userRegister.password}onChange = {changeInputs}/>
                                <label htmlFor="telefono" class="form-label fw-bold" >Número de telefono</label>
                                <input required className="form-control mb-4" type="text"placeholder="Telefono de contacto"name="telefono"value={userRegister.telefono}onChange={changeInputs}/>
                            </div>
                            <div className="col-12 mt-3 text-center">
                                <button className="btn mx-2 my-2 btn-primary" type="submit" onClick={submitForm}>Crear cuenta</button>
                                <button className="btn mx-2 my-2 btn-outline-primary" type="reset" onClick={resetFormRegistro}>Resetear formulario</button>
                            </div>
                            
                            <p className="text-center mt-4">
                                <Link to={"/login"} className="text-dark text-decoration-none text-body">¿Ya tienes cuenta? <b>Inicia sesión</b></Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <Footer/>
        </div>
    )

}

export default Registro;