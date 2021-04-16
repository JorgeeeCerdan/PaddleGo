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
        minlength: 2
    },
    email:{
        type: String,
        required: [true, "Es necesario un email"],
        unique: [true, "El email debe ser unico"],
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

// usuario.pre("pre", function (next){
//     let usuario = this
//     if(usuario.isNew || usuario.isModified("password")){
//         bcrypt.hash(usuario.password, 12, (err, encryptPassword) => {
//             if(err){
//                 next()
//             }
//             else{
//                 usuario.password = encryptPassword
//                 next()
//             }
//         })
//     }
//     else{
//         next()
//     }
// })

// Exportación de modelo usuario
module.exports = Usuario = model(`Usuario`, usuario)
