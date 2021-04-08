import React, {useState} from 'react';
import { ACCESS_TOKEN_NAME } from '../../constants/constants';
import axios from 'axios'

const PerfilEditar = (props) =>{
    
    const infoUsuario = props.datosUsuario
    console.log(infoUsuario)

    const [usuarioModificado, setUsuarioModificado] = useState({})

    const modificarUsuario =  (event) => {
        event.preventDefault()

        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = {headers:{Authorization : `Bearer ${token}`}}

        axios.put("http://localhost:5000/usuario", usuarioModificado, config)
        .then(response => props.setPerfilUsuario(response.data.bodyActualizado))
        .catch(error => console.log(error.response.data.message))

    }
        const inputsUsuario = (event) => {
            setUsuarioModificado({
                ...usuarioModificado,
                [event.target.name] : event.target.value
            })
        }

        const resetForm = () => setUsuarioModificado("")


    return(
        <div>
            <hr/>
                <h1>Modificar perfil de usuario</h1>
                <form action="PUT">
                    <div>
                        <label htmlFor="nombre">Nombre: </label>
                        <input 
                            type="text" 
                            name="nombre" 
                            id="nombre" 
                            placeholder="Introduce un nuevo nombre de usuario"
                            value={usuarioModificado.nombre}
                            onChange={inputsUsuario}
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email: </label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Introduce un email nuevo"
                            value={usuarioModificado.email}
                            onChange={inputsUsuario}
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password: </label>
                        <input 
                            type="password" 
                            name="email" 
                            id="password" 
                            placeholder= "Introduce una password nueva" 
                            value={usuarioModificado.password}
                            onChange={inputsUsuario}
                        />
                    </div>

                    <div>
                        <label htmlFor="telefono">Telefono: </label>
                        <input 
                            type="telefono" 
                            name="telefono" 
                            id="telefono" 
                            placeholder= "Introduce un numero de telefono nuevo" 
                            value={usuarioModificado.telefono}
                            onChange={inputsUsuario}
                        />
                    </div>


                    <button type="submit" onClick={modificarUsuario}>Modificar usuario</button>
                    <button type="submit" onClick={resetForm}>Borrar formulario</button>
                </form>
            <hr/>
        </div>
    )
}

export default PerfilEditar;