import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

const NavbarApp = () =>{

    return(
        <Fragment>
            <nav>
                <ul>
                    <li><Link to="/pistas">Reserva pista</Link></li>
                    <li><Link to="/reserva/usuario">Historial de reservas</Link></li>
                    <li><Link to="/usuario">Perfil</Link></li>
                </ul>
            </nav>
        </Fragment>
    )
}

export default NavbarApp;