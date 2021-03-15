const { Schema, model} = require(`mongoose`)
const validator = require(`validator`);
const bcrypt = require("bcrypt")

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
    // idReserva:[{
    //     type: Schema.Types.ObjectId,
    //     ref: `Reserva`
    // }]
})

// OTRA MANERA DE BCRYPT EN MODELO
// HASHEAR LA PASSWORD DESDE MODELO
// usuario.pre("save", async function (next) {
//     const usuario = this
//     if (usuario.isModified("password")){
//         usuario.password = await bcrypt.hash(usuario.password, 12)
//     }
//     next()
// })


module.exports = Usuario = model(`Usuario`, usuario)
