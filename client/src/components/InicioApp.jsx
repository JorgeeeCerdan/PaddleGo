import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import { ACCESS_TOKEN_NAME } from '../constants/constants'
import NavbarApp from './NavbarApp'

const InicioApp = () => {
    
    const [bienvenidoUsuario, setBienvenidoUsuario] = useState("")
    const [bienvenidoCorrecto, setBienvenidoCorrecto] = useState("")
    const [bienvenidoError, setBienvenidoError] = useState("")
    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization : `Bearer ${token}` } }
        
        axios.get(`http://localhost:5000/usuario`, config)
        .then(response => {
            setBienvenidoUsuario(response.data.usuario.nombre)
            setBienvenidoCorrecto(response.data.message)
        })
        .catch(error => {
            setBienvenidoError(error.response.data.message)
            localStorage.removeItem(ACCESS_TOKEN_NAME)
            setTimeout(() => {
                history.push("/")
            }, 2500);
        })
    },[])
    
    return(
        <div>
            <NavbarApp/>

            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-4 p-5 ">
                            {bienvenidoCorrecto && <h1 className="fw-bold">Bienvenido<br/>{bienvenidoUsuario} 👋</h1>}
                            {bienvenidoError && <h1 className="fw-bold">{bienvenidoError} 👋</h1>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid mb-5">
                <div className="container">
                    <div className="row">                
                        <div className="col-sm-12 col-md-6 col-lg-4 p-5 my-4 me-4 ms-4 rounded shadow flex-fill" >
                            <Link to={"/pistas"} className="text-decoration-none">
                                <img className="img-fluid " src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/tennis_1f3be.png" alt="Pelota de tenis/padel"/>
                                <h2 className="text-start pt-2 pb-2 text-break fw-bold text-dark" >Reserva de pistas</h2>
                                <p className="fw-light text-break text-body">¡Que no te quiten la pista! Eligue la pista en la que quieras jugar y preparate.</p>
                            </Link>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 p-5 mt-4 me-4 ms-4 rounded shadow flex-fill" >
                            <Link to={"/reservas/usuario"} className="text-decoration-none">
                                <img className="img-fluid " src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/open-book_1f4d6.png" alt="Historial de reservas"/>
                                <h2 className="text-start pt-2 pb-2 text-break fw-bold text-dark">Historial de reservas</h2>
                                <p className="fw-light text-break text-body">Ten a mano tu reserva para entrar a jugar a la pista, aquí tienes un listado de las partidas que has reservado y las que están por jugar.</p>
                            </Link>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 p-5 mt-4 me-4 ms-4 rounded shadow flex-fill" >
                            <Link to={"/usuario"} className="text-decoration-none">
                                <img className="img-fluid " src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/bust-in-silhouette_1f464.png" alt="Perfil de usuario"/>
                                <h2 className="text-start pt-2 pb-2 text-break fw-bold text-dark">Perfil de usuario</h2>
                                <p className="fw-light text-break text-body">Aquí podras encontrar ver y modificar toda la información con la que te registraste en la aplicación de PaddleGo.</p>
                            </Link>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 p-5 mt-4 me-4 ms-4 rounded shadow flex-fill" >
                            <Link to={"#"} className="text-decoration-none">
                                <img className="img-fluid " src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/bar-chart_1f4ca.png" alt="Estadisticas"/>
                                <h2 className="text-start pt-2 pb-2 text-break fw-bold text-dark text-muted">#Proximamente: Estadisticas</h2>
                                <p className="fw-light text-break text-body text-muted">Anota tus partidos ganados, perdidos o empatados. Haz un seguimiento de las partidas para ver tu progreso</p>
                            </Link>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 p-5 mt-4 me-4 ms-4 rounded shadow flex-fill" >
                            <Link to={"#"} className="text-decoration-none">
                                <img className="img-fluid " src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/lg/57/stadium_1f3df.png" alt="Estadio de juego"/>
                                <h2 className="text-start pt-2 pb-2 text-break fw-bold text-dark text-muted">#Proximamente: Centros afiliados</h2>
                                <p className="fw-light text-break text-body text-muted">Proximamente podras acceder al centro deportivo que tu eligas y reservar en segundos.</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default InicioApp;