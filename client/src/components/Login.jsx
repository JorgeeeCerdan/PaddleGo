import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { ACCESS_TOKEN_NAME } from '../constants/constants.jsx'
import setAuthToken from '../utility/AuthToken.jsx';

const Login = () => {
  
    const [userLogin, setUserLogin] = useState({ email : "", password : "" })
    
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
                history.push("/Bienvenido")
            }, 2500);

        })
        .catch( error => {
            setLoginError(error.response.data)
        })
    }

    const [loginError, setLoginError] = useState("")
    const [loginCorrecto, setLoginCorrecto] = useState("")

    return(
        <div>
            <button>
                <Link to="/">Boton/icono volver atras</Link>
            </button>
            <h2>¡Bienvenido de nuevo!</h2>
            <p>Prepara tu pala de padel que las pistas están preparadas</p>
            
            <form action="POST" onSubmit={submitLoginForm}>
                <input 
                required 
                type="text" 
                placeholder="Email" 
                name="email"
                value={userLogin.email} 
                onChange={changeInputs}
                />
                
                <input 
                required 
                type="password"
                placeholder="Password"
                name="password"
                value={userLogin.password}
                onChange={changeInputs}
                />

                <p>No dude en contactar con nosotros si tiene algún problema técnico</p>
                <button type="submit" onClick={submitLoginForm}>Iniciar sesion</button>
                { loginError && <div><p>{loginError}</p></div>}
                { loginCorrecto && <div><p>{loginCorrecto}</p></div>}

                <p>
                    <Link to="/registro">¿Aún no tienes cuenta? Registrate</Link>
                </p>
            </form>


        </div>
    )
}

export default Login;