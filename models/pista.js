const { Schema, model} = require(`mongoose`)

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
    }
})

module.exports = Pista = model(`Pista`, pista)