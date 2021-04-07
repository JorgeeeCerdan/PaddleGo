import React from 'react'
import { Link } from 'react-router-dom';

const NavbarApp = () =>{

    return(
        <div>
            <nav>
                <ul>
                    <li><Link to={"/inicio"}>Inicio</Link></li>
                    <li><Link to={"/pistas"}>Reserva pista</Link></li>
                    <li><Link to={"/reservas/usuario"}>Historial de reservas</Link></li>
                    <li><Link to={"/usuario"}>Perfil</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default NavbarApp;