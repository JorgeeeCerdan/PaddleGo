import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { ACCESS_TOKEN_NAME } from '../constants/constants.jsx'
import setAuthToken from '../utility/AuthToken.jsx';
import Footer from './Footer.jsx';

const Login = () => {
  
    const [userLogin, setUserLogin] = useState({ email : "", password : "" })
    const [loginError, setLoginError] = useState("")
    const [loginCorrecto, setLoginCorrecto] = useState("")
    
    const changeInputs = (event) => {
        setUserLogin({ ...userLogin, [event.target.name]: event.target.value})
    }

    const history = useHistory()

    const submitLoginForm = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/login", { ...userLogin})
        .then( response => {
            setLoginCorrecto(response.data.message)
            setAuthToken(response.data.token)
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token)
            setTimeout(() => {
                history.push("/inicio")
            }, 2500);
        })
        .catch( error => {
            setLoginError(error.response.data)
        })
    }

    const resetFormLogin = (event) => {
        event.preventDefault()
        setUserLogin({
            email: "",
            password: ""
        })
    }

    return(
        <div>
            <div className="container-fluid">
                <div className="container my-5">
                    <h1>Bienvenido de nuevo 🔑</h1>
                    <p className="text-body">Prepara tu pala de padel que las pistas están preparadas</p>
                </div>
            </div>

            <div className="container">
                <div className="row">
                {loginCorrecto && <div className="alert alert-success py-4"><strong>{loginCorrecto}</strong></div>}
                {loginError && <div className="alert alert-danger py-4"><strong>{loginError}</strong></div>}
                </div>
            </div>

            <div className="container-fluid">
                <div className="container">
                    <form action="POST" onSubmit={submitLoginForm}>
                        <div className="row bg-light p-5 rounded shadow">
                        <h2 className="pb-4">Inicio de sesión</h2>

                        <div className="col-12">
                            <label htmlFor="text" className="form-label fw-bold">Correo electronico</label>
                            <input required className="form-control mb-4" type="text" placeholder="Email" name="email"value={userLogin.email} onChange={changeInputs}/>
                            <label htmlFor="password" className="form-label fw-bold">Password</label>
                            <input required className="form-control mb-4" type="password"placeholder="Password"name="password"value={userLogin.password}onChange={changeInputs}/>
                        </div>

                        <div className="col-12 mt-3 text-center">
                            <button className="btn mx-2 my-2 btn-primary"  type="submit" onClick={submitLoginForm}>Iniciar sesion</button>
                            <button className="btn mx-2 my-2 btn-outline-primary" type="reset" onClick={resetFormLogin}>Resetear formulario</button>
                        </div>

                        <p className="text-center mt-4">
                            <Link to="/registro" className="text-dark text-decoration-none text-body">¿Aún no tienes cuenta? <b>Registrate</b></Link>
                        </p>
                        </div>
                    </form>
                    
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Login;