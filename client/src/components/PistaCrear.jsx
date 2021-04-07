import axios from 'axios'
import React, { useState } from 'react'
import { ACCESS_TOKEN_NAME } from '../constants/constants'
import { useHistory } from 'react-router';


const PistaCrear = () => {

    const [crearPista, setCrearPista] = useState({
        nombre : "",
        estado : "",
        tipo : "",
        ubicacion : "",
        capacidad : ""
    })

    const history = useHistory()
    const handleCrearPista = (e) => {
        e.preventDefault();
        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}
    
        axios.post("http://localhost:5000/pista", {...crearPista}, config)
        .then( response => {
            console.log(response.data)
            setCrearPista( response.data)
            history.push("/pistas")
        })
        .catch( error => { 
            console.log( error.response.data.message )
        })
    }
        
    const changeInputs = (event) => {
        setCrearPista({ ...crearPista, [event.target.name]: event.target.value})
    }

    return(
        <div>
            <form action="POST">
                <input required type="text" placeholder="Nombre de pista" name="nombre" value={crearPista.nombre} onChange={changeInputs} />

                <div>
                    <label htmlFor="estado"> Libre </label>
                    <input required type="radio" placeholder="Estado de la pista" name="estado" value={true} onChange={changeInputs} />
                    <label htmlFor="estado"> Ocupada </label>
                    <input required type="radio" placeholder="Estado de la pista" name="estado" value={false} onChange={changeInputs} />
                </div>
                
                <input required type="text" placeholder="Tipo de pista" name="tipo" value={crearPista.tipo} onChange={changeInputs} />
                <input required type="text" placeholder="Ubicacion de la pista" name="ubicacion" value={crearPista.ubicacion} onChange={changeInputs} />
                <input required type="text" placeholder="Numero de personas en pista" name="capacidad" value={crearPista.capacidad} onChange={changeInputs} />                

            </form>

            <button type="submit" onClick={handleCrearPista}> Crear pista</button>
        </div>
    )
}


export default PistaCrear;