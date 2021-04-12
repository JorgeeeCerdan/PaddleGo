import React from 'react'
import { Link } from 'react-router-dom'
import './InicioPromo.css'
import Footer from './Footer'


const InicioPromo = () => {

    return (
        <div>

            <div className="container my-5 bg-light rounded shadow align-center">
                <div className="row align-items-stretch">
                    <div className="col bgImg d-none d-md-block rounded-start"></div>

                    <div className="col p-5 rounded">
                        <div className="text-start">
                            <h1>🎾</h1>
                        </div>

                        <h1 className="fw-bold text-start pb-5"><b><i> PaddleGo </i></b></h1>
                        <div className="mb-5">
                            <h2 className="fs-1 fw-bold">¡Que no te quiten la pista!</h2>
                            <p className="fs-5 fw-light">La nueva forma de reservar tu pista sin perder un segundo más y así disfruta con tus amigos o compite contra ellos</p>
                        </div>

                        <Link className="text-white text-decoration-none fw-bold" to={"/registro"}><button className="col-4 my-2 w-100 btn btn-primary text-white" >Registrate</button></Link>
                        <Link className="text-dark text-decoration-none fw-bold" to={"/login"}><button className="col-4 my-2 w-100 btn btn-light">Iniciar sesión</button></Link>

                    </div>
                </div>
            </div>

        <Footer/>

        </div>
    )
}

export default InicioPromo;