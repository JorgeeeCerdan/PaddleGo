import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { ACCESS_TOKEN_NAME } from '../../constants/constants'

const BorrarUsuario = ({setPerfilUsuario}) => {
    const history = useHistory()
    const [borrarUsuarioCorrecto, setBorrarUsuarioCorrecto] = useState("")
    const [borrarUsuarioError, setBorrarUsuarioError] = useState("")    
    
    const handleDelete = () => {
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { header: { Authorization: `Bearer ${token}`}}
        
        axios.delete(`http://localhost:5000/usuario`, config)
        .then(response => {
            setPerfilUsuario(response.data)
            console.log(response.data)
            setTimeout(() => {
                setBorrarUsuarioCorrecto(response.data.message)
                history.push("/")
            }, 5500);
        })
        .catch(error => {
            console.log(error.response.data)
            setBorrarUsuarioError(error.response.data.message)
        })
    }
    return(
        <div>

            <div className="container-fluid mt-5">
                <div className="container">
                    <div className="row">
                        {borrarUsuarioCorrecto && <div className="alert alert-success py-4"><p>{borrarUsuarioCorrecto}</p></div>}
                        {borrarUsuarioError && <div className="alert alert-danger py-4"><p>{borrarUsuarioError}</p></div>}
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="container">
                    <div className="row bg-light p-5 rounded shadow">
                        <h2>Borrar cuenta</h2>
                        <p>Se borrara la cuenta y los datos del usuario ademas de los datos generados por el mismo. ¿Esta seguro de borrar la cuenta?</p>
                        <button class="btn btn-outline-danger my-4" type="submit" onClick={handleDelete}>Borrar cuenta</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default BorrarUsuario;