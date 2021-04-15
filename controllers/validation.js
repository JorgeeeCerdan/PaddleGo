// Objeto de valicaciones previas 
const Validation = {

    validationId(id){
        if( id.length < 24) throw new Error(`Id no correcta`)
        if( id.length > 26) throw new Error(`Id no correcta`)
    },

    validationRegister(nombre, email, password, telefono){
        if(!nombre) throw new Error(`Es necesario un nombre de usuario`)
        if(!email) throw new Error(`Es necesario un email`)
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){throw new Error(`Esto no es un email`)}
        if(!password) throw new Error(`Es necesario un password`)
        if ( typeof password !== "string" ) throw new TypeError(`La password no es valida`)
        if ( !password.trim().length ) throw new Error(`La password no es valida`)
        if ( password.length < 3 ) throw new Error(`La password no es valida`)
        if(!telefono) throw new Error(`Es necesario un telefono de contacto`)
        if(telefono.length < 9) throw new Error(`Faltan numeros en tu numero de telefono`)
    },
    
    validationLogin(email, password){
        if(!email) throw new Error(`Es necesario un email`)
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){throw new Error(`Esto no es un email`)}
        if(!password) throw new Error(`Es necesario un password`)
        if ( typeof password !== "string" ) throw new TypeError(`La password no es valida`)
        if ( !password.trim().length ) throw new Error(`La password no es valida`)
        if ( password.length < 3 ) throw new Error(`La password no es valida`)
    },

    validationPista(nombre, estado, tipo, ubicacion, capacidad){
        if(!nombre) throw new Error(`Error, se requiere nombre`)
        if(!estado) throw new Error(`Error, se requiere estado de la pista`)
        if(!tipo) throw new Error(`Error, se necesita expecificar que tipo de pista es`)
        if(!ubicacion) throw new Error(`Error, se necesita decir si la pista es outdoor o indoor`)
        if(!capacidad) throw new Error(`Error, se necesita expecificar la capacidad de la pista`)
    },

    validationReserva(idUsuario, idPista){
        if(!idUsuario) throw new Error(`Error, no se encontro usuario asociado a la reserva`)
        if(!idPista) throw new Error(`Error, no se encontro pista asociada a la reserva`)
    },
    
    validationArray(array){
        if (!(array instanceof Array)) throw new TypeError(`${array} No es un array`)
        array.forEach(element =>{
            if ( typeof element !== "string" )throw new TypeError(`${element} no es elemento valido`);
            if ( !element.trim().length ) throw Error(`${element} esta vacio`);
        })
    }
}

// Exportacion del objeto Validation
module.exports = Validation