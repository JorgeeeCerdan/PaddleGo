// Importación de modulos
const express = require(`express`);
const usuarioRouter = express.Router();
const Usuario = require("../models/usuario.js");
const bcrypt = require("bcrypt");
const {validationId, validationEmail, validationPassword, validationTelefono} = require("../controllers/validation");
const {crearToken, comprobarToken} = require(`../controllers/authToken`)

// GET - Publica - Consulta de usuarios
usuarioRouter.get("/usuarios", (req, res) => {
    Usuario.find({}, (err, usuario) => {
        if(err){res.status(400).send(err.response.data);}
        res.json(usuario);
    })
    .catch(console.error)
})

// GET - Privada - Consulta de usuario individual
usuarioRouter.get("/usuario/:id", comprobarToken, (req, res) => {
    const {params: {id}} = req

    Usuario.findById((id), (err, usuario) => {
        if(err){res.status(400).send(err.response.data);}
        res.json(usuario);
    })
    .catch(console.log)
})

// POST - Publica - Registro de nuevos usuarios
usuarioRouter.post("/registros", async (req,res) => {

    const { usuario: { nombre, email, telefono, password }} = req.body

    // HASH DESDE MODELO
    validationEmail(email)
    validationPassword(password)
    validationTelefono(telefono)
    
    // HASH DESDE RUTA
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const usuario = new Usuario({
        nombre: nombre,
        email: email,
        password: hashPassword,
        telefono: telefono
    })
    
    usuario.save()
    .then(usuarioToken => {
        res.status(200).send({token: crearToken(usuarioToken)})
    })
    .catch(console.log)
})

// POST - Publica - Inicio de sesión
usuarioRouter.post("/login", async (req, res)=>{
    try {
        validationEmail(req.body.email)
        validationPassword(req.body.password)

        const usuario = await Usuario.findOne({email: req.body.email})
        
        if (!usuario){
            return res.status(401).json({message: "El usuario no existe"})
        }            
        
        const compararPassword = await bcrypt.compare(req.body.password, usuario.password)
        
        if (!compararPassword){
                return res.status(401).json({message: "Contraseña incorrecta"})
            }
                return res.status(200).send({token: crearToken(usuario)}) 

    } catch (error) {
        res.send(error.message)
    }
})

// PUT - Privada - Modificación de datos del usuario
usuarioRouter.put("/usuario/:id", comprobarToken, (req,res) =>{
    const {params:{id}} = req;
    let bodyActualizado = req.body;
    validationId(id)

    Usuario.findByIdAndUpdate(id, bodyActualizado, (err,usuarioActualizado) =>{
        if(err){res.status(500).send(`La cuenta no ha podido actualizarse: ${err.message}`)}
        res.status(200).send(usuarioActualizado)

        if(usuarioActualizado.id !== req.body.sub){
            res.status(401).send(`No puedes actualizar los datos`)
        }
    })
    .catch(console.log)
})

// DELETE - Privada - Borrar cuenta
usuarioRouter.delete("/usuario/:id", comprobarToken, (req,res) => {
    const { params: { id } } = req
    validationId(id)
    Usuario.findByIdAndDelete(id)
    .then(() => res.send("Usuario borrado exitosamente"))
    .catch(console.log)  
})

// Exportación de modulos
module.exports = usuarioRouter;