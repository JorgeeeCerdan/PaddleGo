import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import {ACCESS_TOKEN_NAME} from "../constants/constants.jsx"
import setAuthToken from '../utility/AuthToken.jsx';
import NavbarHome from './NavbarHome.jsx';

const Registro = () => {

    const [userRegister, setUserRegister] = useState({
        nombre: "",
        email: "",
        password: "",
        telefono: ""
    })

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
            }, 2000);
        })
        .catch( error => {
            setErrorRegister(error.response.data.message)
            console.log(error.response.data.message)
        })
    }
    
    const [errorRegister, setErrorRegister] = useState("")
    const [correctRegister, setCorrectRegister] = useState("")
    
    return(
        <div>
            <NavbarHome/>
            <h2>Cuentanos sobre ti</h2>
            <p>Rellena los campos necesarios para crear tu cuenta</p>

            <form action="POST" onSubmit={submitForm}>
                <input
                required 
                type="text"
                placeholder="Nombre completo"
                name="nombre"
                value={userRegister.nombre}
                onChange={changeInputs}
                />

                <input
                required
                type="email"
                placeholder="Email"
                name="email"
                value={userRegister.email}
                onChange={changeInputs}
                />

                <input 
                required
                type="password"
                placeholder="Passoword"
                name="password"
                value={userRegister.password}
                onChange = {changeInputs}
                />
                
                <input 
                required
                type="text"
                placeholder="Telefono de contacto"
                name="telefono"
                value={userRegister.telefono}
                onChange={changeInputs}
                />

                <button type="submit" onClick={submitForm}>Crear cuenta</button>
                {errorRegister && <div><p>{errorRegister}</p></div>}
                {correctRegister && <div><p>{correctRegister}</p></div>}

                <p><Link to={"/login"}>¿Ya tienes cuenta? Inicia sesión</Link></p>

            </form>
        </div>
    )

}

export default Registro;