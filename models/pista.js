// Importación de modulos
const { Schema, model} = require(`mongoose`)

// Creacion Modelo Pista
const pista = new Schema ({
    nombre:{
        type: String,
        require: true
    },
    estado:{
        type: Boolean,
    },
    tipo:{
        type: String,
    },
    ubicacion:{
        type: String,
    },
    capacidad:{
        type: Number,
        minlegth: 2,
        maxlegth: 4
    },
    reserva:{
        type: Schema.Types.ObjectId,
        ref: `Reserva`
    }
})

// Exportación de modelo Pista
module.exports = Pista = model(`Pista`, pista)