// Importación de modulos
const { Schema, model} = require(`mongoose`)
const validator = require(`validator`);
const bcrypt = require("bcrypt")

// Creación Modelo Usuario
const usuario = new Schema ({
    nombre:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 2
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate(email){
            if(!validator.isEmail(email)){
                throw new Error (`Este correo no es valido`)
            }
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 3
    },
    telefono:{
        type: Number,
        unique: true,
        trim: true,
        minlength:4,
        maxlength:9
    }
})

/*
    // Bcrypt desdes modelo
    usuario.pre("save", async function (next) {
        const usuario = this
        if (usuario.isModified("password")){
            usuario.password = await bcrypt.hash(usuario.password, 12)
        }
        next()
    })
*/

// Exportación de modelo usuario
module.exports = Usuario = model(`Usuario`, usuario)
