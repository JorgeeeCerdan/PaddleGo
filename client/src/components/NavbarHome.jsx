import React, { Fragment } from 'react'
import { Link } from "react-router-dom"

const NavbarHome = () => {

    return(
        <Fragment>
        <div>
            <div>
                <img src="" alt=""/>   
            </div>
            <nav>
                <ul>
                    <li><Link to="/inicio">Inicio</Link></li>
                    <li><Link to="/caracteristicas">Caracteristicas</Link></li>
                    <li><Link to="/equipo">Equipo</Link></li>
                    <li><Link to="/contacto">Contacto</Link></li>
                </ul>
            </nav>
        </div>
    </Fragment>
    )
}

export default NavbarHome;