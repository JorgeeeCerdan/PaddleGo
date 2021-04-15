import React, { Fragment } from 'react'
import { Link } from "react-router-dom"

const NavbarHome = () => {

    return(
        <Fragment>
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
            <div class="container-fluid">
                    <Link class="navbar-brand" to={"/"}><b><i>PaddleGo</i></b></Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link className="nav-link active" aria-current="page" href="/">Inicio</Link>
                        <Link className="nav-link" to={"/caracteristicas"}>Caracteristicas</Link>
                        <Link className="nav-link" to={"/equipo"}>Equipo</Link>
                        <Link className="nav-link" to={"/contacto"}>Contacto</Link>
                    </div>
                </div>
            </div>
        </nav>
    </Fragment>
    )
}

export default NavbarHome;