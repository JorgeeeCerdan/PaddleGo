const Validation = {
    validationPassword(password){
        if ( typeof password !== "string" ) throw new TypeError(`La password: ${password} no es valida`)
        if ( !password.trim().length ) throw new Error(`La password: ${password} es erronea`)
        if ( password.length < 3 ) throw new Error(`La password: ${password} tiene que ser mas segura `)
    },
    
    validationEmail(email){
        if ( typeof email !== "string" )throw new TypeError(`El email: ${email} no es un email`)
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) throw new Error(`El email: ${email} no es valido`)
        if ( !email.trim().length ) throw new Error(`La id: ${email} esta vacia`)
    },
    
    validationArray(array){
        if (!(array instanceof Array)) throw new TypeError(`${array} No es un array`)
        array.forEach(element =>{
            if ( typeof element !== "string" )throw new TypeError(`${element} no es elemento valido`);
            if ( !element.trim().length ) throw Error(`${element} esta vacio`);
        })
    }
}

module.exports = Validation