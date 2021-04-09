import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'

const FiltroUsuarios = (props) => {

    const usuarios = props.usuarios
    const [buscarUsuario, setBuscarUsuario] = useState([])
    const [sacarUsuario, setSacarUsuario] = useState([...usuarios])
    const [filtroCorrecto, setFiltroCorrecto] = useState("")
    const [filtroError, setFiltroError] = useState("")

    const inputUsuario = (event) => setBuscarUsuario(event.target.value)

    const filtrarUsuarios = (event) => {
        event.preventDefault();
        const filtrarUsuario = usuarios.filter(usuario => usuario.nombre === buscarUsuario)
        if(filtrarUsuario.length === 0){
            setFiltroError("No existe usuario con ese nombre")
        }else{
            setFiltroError("")
            setFiltroCorrecto("Resultado de busqueda:")
            setSacarUsuario(filtrarUsuario)
        }
    }

    const history = useHistory()
    const resetFilter = () => {
        setSacarUsuario([])
        setBuscarUsuario([])
        setFiltroError("")
        history.go("/usuarios")
    }


    return(
        <div>
            <label htmlFor="filtroUsuarios">
                <input type="text" name="usuario" value={buscarUsuario} placeholder="Introduce el usuario a buscar" onChange={inputUsuario}/>
                <button type="submit" onClick={filtrarUsuarios}>Buscar usuario</button>
                <button type="reset" onClick={() => resetFilter()}>Borrar filtro</button>
            </label>
            <div>
                {filtroError && <div><p>{filtroError}</p></div>}
                {
                    sacarUsuario && sacarUsuario.map(usuario => (
                        <div key={usuario._id}>
                            <hr/>
                            {filtroCorrecto && <div><p>{filtroCorrecto}</p></div>}
                            <div>
                                <h3>Nombre completo</h3>
                                <p>{usuario.nombre}</p>
                            </div>
                            <div>
                                <h3>Correo electronico</h3>
                                <p>{usuario.email}</p>
                            </div>
                            <div>
                                <h3>Telefono</h3>
                                <p>{usuario.telefono}</p>
                            </div>
                            <hr/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FiltroUsuarios;