// Importación de modulos
const jwt = require(`jsonwebtoken`);
require(`dotenv`).config()
const {env: {SECRET}} = process

// Objeto Json Web Token
const authToken = {

    // Creación del Token
    crearToken(usuarioToken){
        const payload = {
            sub: usuarioToken._id,
            iat: Date.now() / 1000
            // exp:
        }
        return jwt.sign(payload, SECRET, {expiresIn: "24h"})
    },

    // Comprobación de Token
    comprobarToken(req, res, next){
        const token = req.headers[ "authorization"]
        if(!token) return res.status(401).send({message:`Se requiere autorización`})

        jwt.verify(token.split(" ")[1], SECRET, (error, decoded) =>{
            if(error) return res.status(401).send({message : `Inicia sesión para renovar tu autorización`})
            req.usuario = decoded;
            next()
        })
    }
}

// Exportación Json Web Token
module.exports = authToken

