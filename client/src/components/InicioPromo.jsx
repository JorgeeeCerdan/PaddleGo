import React from 'react'
import { Link } from 'react-router-dom'
import NavbarHome from './NavbarHome'


const InicioPromo = () => {

    return (
        <div>
            <NavbarHome/>
            <div>
                <h1>¡Que no te quiten la pista!</h1>
                <p>Reserva pista sin perder un segundo más y disfruta con tus amigos o compite contra ellos</p>
            </div>
            <button><Link to={"/registro"}>Registrate</Link></button>
            <button><Link to={"/login"}>Iniciar sesión</Link></button>
        </div>
    )
}

export default InicioPromo;