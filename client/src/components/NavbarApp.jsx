import React from 'react'
import { Link } from 'react-router-dom';

const NavbarApp = () =>{


    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow py-3 px-3 mb-5">
            <div class="container-fluid">
                <Link class="navbar-brand" to={"/inicio"}><b><i>PaddleGo </i>🎾</b></Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <Link className="nav-link mx-4 text-dark" to={"/usuarios"}>Usuarios registrados</Link>
                    <Link className="nav-link mx-4 text-dark" to={"/usuario"}>Perfil de usuario</Link>
                    <Link className="nav-link mx-4 text-dark" to={"/reservas/usuario"}>Historial de reservas</Link>
                    <Link className="nav-link mx-4 text-dark" to={"/pistas"}>Reserva de pista</Link>
                </div>
            </div>
            </div>
        </nav>
    )
}

export default NavbarApp;