import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'

const InicioApp = () => {

    return(
        <Fragment>
                <div>
                    <h1><Link to="/pistas">Reserva pista</Link></h1>
                </div>
                <div>
                    <h1><Link to="/reservas/usuario">Historial de reservas</Link></h1>
                </div>
                <div>
                    <h1><Link to="/usuario">Perfil</Link></h1>
                </div>
        </Fragment>
    )
}

export default InicioApp;