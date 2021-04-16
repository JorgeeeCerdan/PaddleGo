// Importación modulos
require(`dotenv`).config()
const { env: {PORT, MONGO_URL}} = process
const express = require(`express`)
const server = express()
const cors = require(`cors`)
const morgan = require(`morgan`)
const path = require('path')

// Importación de rutas
const usuarioRouter = require("./routes/usuarioRouter")
const pistaRouter = require("./routes/pistaRouter")
const reservaRouter = require("./routes/reservaRouter")

// Conexión con Mongo
const mongoose = require(`mongoose`)
mongoose.connect(MONGO_URL,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})
    // .then(() => {
    //     console.log("servidor conectado")
    // })

    // Error en la conexión con Mongo
    .catch((error) => {
        console.log(error)
        if(mongoose.connection.readyState === 1)
        // Descontecamos mongoose
            return mongoose.disconnect()
            .catch(console.error)
        // Descontecamos node
            .then(() => process.exit())
    })

    // Middlewares
    server.use(cors())
    server.use(morgan(`dev`)) 
    server.use(express.json())
    server.use(express.urlencoded({extended:true}))
    server.use(express.static(path.join(__dirname, "client", "build")))
    server.use(usuarioRouter)
    server.use(pistaRouter)
    server.use(reservaRouter)
    
    // Bienvenida
    server.get("/", (req, res) => res.status(200).send({ message: `Bienvenido, servidor encendido en el puerto ${PORT}`}))
    // Página consultada no existente
    server.use(`*`, (req, res) => res.sendFile(path.join(__dirname, "client", "build", "index.html")))
    // Poner en escucha al server
    server.listen(PORT, () => {console.log(`Servidor corriendo en el puerto ${PORT}`)})
