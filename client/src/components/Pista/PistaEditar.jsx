import React, {useState} from 'react'
import { ACCESS_TOKEN_NAME } from '../../constants/constants.jsx'
import axios from 'axios'

const PistaEditar = ({datosPista, setPistaAReservar}) => {

    const infoPista = datosPista
    const [pistaModificada, setPistaModificada] = useState({})

    const modificarPista = (event) => {
        event.preventDefault()

        const token = window.localStorage.getItem(ACCESS_TOKEN_NAME)
        const config = { headers: { Authorization: `Bearer ${token}`}}
    
        axios.put(`http://localhost:5000/pista/${infoPista._id}`, pistaModificada, config)
        .then(response => setPistaAReservar(response.data.pistaActualizada))
        .catch(error => console.log(error.response.data))
    }

    const changeInputs = (event) => setPistaModificada({
        ...pistaModificada,
        [event.target.name] : event.target.value
    })

    const resetForm = () => setPistaModificada("")

    return(
            <div>
                <hr/>
                <form action="PUT">
                    <div>
                        <label htmlFor="nombre">Nombre de la pista</label>
                        <input 
                            type="text" 
                            id="nombre" 
                            name="nombre" 
                            placeholder={infoPista.nombre} 
                            value={pistaModificada.nombre} 
                            onChange={changeInputs}
                        />
                    </div>

                    <div>
                        <label htmlFor="tipo">Tipo de pista</label>
                        <input 
                            type="text" 
                            id="tipo" 
                            name="tipo" 
                            placeholder={infoPista.tipo}  
                            value={pistaModificada.tipo} 
                            onChange={changeInputs}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="estado"> Libre </label>
                        <input 
                            required 
                            type="radio" 
                            name="estado" 
                            value={true} 
                            onChange={changeInputs} 
                        />
                        <label htmlFor="estado"> Ocupada </label>
                        <input 
                            required 
                            type="radio" 
                            name="estado" 
                            value={false} 
                            onChange={changeInputs} 
                        />
                    </div>

                    <div>
                        <label htmlFor="ubicación">Ubicación</label>
                        <input 
                            type="text" 
                            id="ubicacion" 
                            name="ubicacion" 
                            placeholder={infoPista.ubicacion} 
                            value={pistaModificada.ubicacion} 
                            onChange={changeInputs}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="capacidad">Capacidad</label>
                        <input 
                            type="text" 
                            id="capacidad" 
                            name="capacidad" 
                            placeholder={infoPista.capacidad + ` Personas`} 
                            value={pistaModificada.capacidad} 
                            onChange={changeInputs}
                        />
                    </div>

                    <button type="submit" onClick={modificarPista}>Modificar pista</button>
                    <button type="reset" value="Reset" onClick={resetForm}>Resetear formulario</button>
                </form>
            </div>
    )
}

export default PistaEditar;