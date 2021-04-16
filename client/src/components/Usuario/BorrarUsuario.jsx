import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { HEROKU_URL } from '../../constants/constants'
import Modal from 'react-modal'

const BorrarUsuario = ({setPerfilUsuario, perfilUsuario}) => {

    const history = useHistory()
    const [borrarUsuarioCorrecto, setBorrarUsuarioCorrecto] = useState("")
    const [borrarUsuarioError, setBorrarUsuarioError] = useState("")    
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)
    
    const handleDelete = () => {
        axios.delete(`${HEROKU_URL}/usuario`)
        .then(response => {
            setPerfilUsuario(response.data)
            closeModal()
            setTimeout(() => {
                setBorrarUsuarioCorrecto(response.data.message)
                history.push("/")
            }, 2000);
        })
        .catch(error => {
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
                        <button class="btn btn-outline-danger my-4" type="submit" onClick={openModal}>Borrar cuenta</button>
                    </div>
                </div>
            </div>

            <div className="modal position-relative">
                <Modal className="modal-dialog position-absolute top-50 start-50 translate-middle p-5 bg-light rounded shadow"  isOpen={modalIsOpen} onRequestClose={closeModal} value={perfilUsuario.nombre}>
                    <button className="btn btn-primary" onClick={closeModal}>Cerrar ventana emergente</button>
                    <hr/>
                        <div>
                            <h4>¿{perfilUsuario.nombre}, estas seguro de lo que vas a hacer? 😔</h4>
                            <p>Si decides borrar la cuenta de forma definitiva, se borraran todos tus datos y en caso de querer utilizar PaddleGo en otra ocasión, tendras que volver a registrarte</p>
                        </div>
                    <hr/>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-outline-danger" onClick={handleDelete}>Si, quiero borrar mi cuenta</button>
                    </div>
                </Modal>
            </div>

        </div>
    )
}
export default BorrarUsuario;