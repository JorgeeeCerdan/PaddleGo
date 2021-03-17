// Objeto de valicaciones previas 
const Validation = {

    // Validación _id Mongo
    validationId(id){
        if( id.length < 24) throw new Error(`Id de usuario no correcta`)
    },

    // Validación Password
    validationPassword(password){
        if ( typeof password !== "string" ) throw new TypeError(`La password: ${password} no es valida`)
        if ( !password.trim().length ) throw new Error(`La password: ${password} es erronea`)
        if ( password.length < 3 ) throw new Error(`La password: ${password} tiene que ser mas segura `)
    },
    
    // Validación email via Regex
    validationEmail(email){
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            throw new Error(`Esto no es un email`)  
        } 
    },

    // Validación Telefono
    validationTelefono(telefono){
        if(telefono.length < 9) throw new Error(`Faltan numeros en tu numero de telefono`)
    },
    
    // Validación Array
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