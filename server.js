// Importación modulos
require(`dotenv`).config()
const { env: {PORT, MONGO_URL}} = process
const express = require(`express`)
const server = express()
const morgan = require(`morgan`)

// Importación de rutas
const usuarioRouter = require("./routes/usuarioRouter")
const pistaRouter = require("./routes/pistaRouter")
const reservaRouter = require("./routes/reservaRouter")

// Conexión con Mongo
const mongoose = require(`mongoose`)
mongoose.connect(MONGO_URL,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})

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
    server.use(morgan(`dev`)) 
    server.use(express.json())
    // DEPRECATED - Ya no se usa server.use(express.urlencoded())
    server.use(usuarioRouter)
    server.use(pistaRouter)
    server.use(reservaRouter)
    
    // Bienvenida
    server.get("/", (req, res) => res.send("Bienvenido, servidor encendido"))
    // Página consultada no existente
    server.use(`*`, (req, res) => res.status(404).send(`Error 404. La página no existe`))
    // Poner en escucha al server
    server.listen(PORT, () => {console.log(`Servirdor corriendo en el puerto ${PORT}`)})
