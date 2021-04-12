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

            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <label htmlFor="filtroUsuarios" className="form-label fw-bold">Buscador de padelistas por nombre</label>
                        <input className="form-control w-50" type="text" name="usuario" value={buscarUsuario} placeholder="Introduce el nombre del usuario a buscar" onChange={inputUsuario}/>
                        <button className="btn btn-primary w-25" type="submit" onClick={filtrarUsuarios}>Buscar usuario</button>
                        <button className="btn btn-outline-primary w-25" type="reset" onClick={() => resetFilter()}>Borrar filtro</button>
                    </div>
                </div>
            </div>


            <div className="container-fluid my-5">
                <div className="container">
                        {filtroError && <div><p>{filtroError}</p></div>}
                        {sacarUsuario && sacarUsuario.map(usuario => (
                            <div key={usuario._id} className="row bg-light p-5 rounded shadow">
                                {filtroCorrecto && <div><h3>{filtroCorrecto}</h3></div>}
                                <div className="d-flex flex-nowrap">
                                    <div className="col-4 flex-nowrap">
                                        <h4>Nombre completo</h4>
                                        <p>{usuario.nombre}</p>
                                    </div>
                                    <div className="col-4 flex-nowrap">
                                        <h4>Correo electronico</h4>
                                        <p>{usuario.email}</p>
                                    </div>
                                    <div className="col-4 flex-nowrap">
                                        <h4>Telefono</h4>
                                        <p>{usuario.telefono}</p>
                                    </div>                    
                                </div>
                            </div>
                        ))}
                </div>
            </div>

        </div>
    )
}

export default FiltroUsuarios;