import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios'
import NavbarApp from '../NavbarApp.jsx'

const Usuarios = () =>{

    const [usuarios, setUsuarios] = useState([])
    console.log(usuarios)

    useEffect(() => {
        axios.get("http://localhost:5000/usuarios")
        .then(response => {
            setUsuarios(response.data.usuarios)
        })
        .catch(error =>{
            console.log(error.response.data.message)
        })
    },[])

    return(
        <Fragment>
        <NavbarApp/>
        <div>
            <h2>Perfil de usuario 👤</h2>
            <div>
                {
                    usuarios.map( element => (
                        <div key={element._id}>
                        <div>
                            <div>
                            <h3>Nombre completo</h3>
                            <p>{element.nombre}</p>
                            <button>Modificar</button>
                            </div>
                            <div>
                            <h3>Correo electronico</h3>
                            <p>{element.email}</p>
                            <button>Modificar</button>
                            </div>
                            <div>
                            <h3>Password</h3>
                            <p>{element.passwod}</p>
                            <button>Modificar</button>
                            </div>
                            <div>
                            <h3>Telefono</h3>
                            <p>{element.telefono}</p>
                            <button>Modificar</button>
                            </div>
                            <button>Guardar cambios</button>
                        </div>
                        <div>
                            <h3>Borrar cuenta</h3>
                            <p>Se borrara la cuenta y todos los datos del usuario ademas de los generados por el mismo. ¿Esta seguro de borra la cuenta?</p>
                            <button>Borrar cuenta</button>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
        </Fragment>
    )

}

export default Usuarios;