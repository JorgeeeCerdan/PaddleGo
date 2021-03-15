const jwt = require(`jsonwebtoken`);
const moment = require(`moment`)
const { config } = require("dotenv");
require(`dotenv`).config()
const {env: {SECRET}} = process

const authToken = {
    crearteToken(usuarioToken){
        const payload = {
            sub: usuarioToken._id,
            iat: Date.now() / 1000
            // exp:
        }
        return jwt.sign(payload, SECRET, {expiresIn: "2m"})
    },

    comprobarToken(req, res, next){
        const token = req.headers[ "authorization"]
        if(!token){
            res.status(400).send("No existe el token")
        }
        
        if(token.expiresIn < Date.now()){
            return res.status(400).send("El token expiro")
        }

        const decoded = jwt.verify(token.split(" ")[1], SECRET)
        console.log(decoded)

        req.usuario = decoded;
        next()
    }
}

module.exports = authToken

