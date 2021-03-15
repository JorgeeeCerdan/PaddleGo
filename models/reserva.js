const { Schema, model} = require(`mongoose`)

const reserva = new Schema ({
    idUsuario:{
        type: Schema.Types.ObjectId,
        ref: `Usuario`
    },
    idPista:{
        type: Schema.Types.ObjectId,
        ref: `Pista`
    },
    fecha:{
        type: String,
        default: Date()
    }
})

module.exports = Reserva = model(`Reserva`, reserva)