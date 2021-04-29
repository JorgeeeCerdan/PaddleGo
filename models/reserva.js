// Importación de modulos
const { Schema, model} = require(`mongoose`)

// Creacion del Modelo Reserva
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
        type: Date
    },
    codigoReserva:{
        type: String
    }
})

// Exportación de modelo reserva
module.exports = Reserva = model(`Reserva`, reserva)