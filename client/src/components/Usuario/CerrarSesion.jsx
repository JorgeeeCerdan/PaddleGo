import React from 'react';
import { useHistory } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../../constants/constants';

const CerrarSesion = () => {

    const history = useHistory()

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        setTimeout(() => {
            history.push("/")
        }, 2500);
    }
    return(

        <div className="container-fluid my-5">
            <div className="container">
                <div className="row bg-light p-5 rounded shadow">
                    <h2>Cerrar sesión</h2>
                    <p>Si desea salir de la aplicación de forma segura, por favor, haga click en el boton "Cerrar sesión". Para volver a utilizar PaddleGo tendra que hacer iniciar sesión.</p>
                    <button className="btn btn-outline-primary" type="submit" onClick={handleLogout}>Cerrar sesión</button>
                </div>
            </div>
        </div>

    )
}
export default CerrarSesion;