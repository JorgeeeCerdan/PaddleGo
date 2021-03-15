const express = require(`express`);
const usuarioRouter = express.Router();
const Usuario = require("../models/usuario.js");

const bcrypt = require("bcrypt");
const {validationId, validationEmail, validationPassword} = require("../validation/validation");

const {crearToken, comprobarToken} = require(`../controllers/authToken`)

// CONSULTA DE USUARIOS
usuarioRouter.get("/usuarios", (req, res) => {
    Usuario.find({}, (err, usuario) => {
        if(err){res.status(400).send(err.response.data);}
        res.json(usuario);
    })
    .catch(console.error)
})

// CONSULTA INDIVIDUAL DE USUARIO
usuarioRouter.get("/usuario/:id", comprobarToken, (req, res) => {
    const {params: {id}} = req

    Usuario.findById((id), (err, usuario) => {
        if(err){res.status(400).send(err.response.data);}
        res.json(usuario);
    })
    .catch(console.log)
})

// REGISTRO DE NUEVO USUARIO
usuarioRouter.post("/registros", async (req,res) => {

    // const { usuario: {nombre, email, password, telefono}} = req.body
    const nombre = req.body.nombre;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const password = req.body.password;
    
    // HASH DESDE MODELO
    // validationEmail(email)
    // validationPassword(password)

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

// USUARIO LOGIN
usuarioRouter.post("/login", async (req, res)=>{
    try {
        const usuario = await Usuario.findOne({email: req.body.email})
        
        if (!usuario){
            res.status(400).json({message: "El usuario no existe"})
        }
        
        if(usuario){
            const compararPassword = await bcrypt.compare(req.body.password, usuario.password)
            if (!compararPassword){
                res.status(400).json({message: "Contraseña incorrecta"})
            } else {
                return res.status(200).send({token: crearToken(usuario)})
            }
        } 
    } catch (error) {
        console.log(error)
    }
})

// BORRAR USUARIOS
usuarioRouter.delete("/usuario/:id", (req,res) => {
    const { params: { id } } = req
    validationId(id)
    Usuario.findByIdAndDelete(id)
    .then(() => res.send("Usuario borrado exitosamente"))
    .catch(console.log)  
})

// MODIFICACION DE CUENTA
usuarioRouter.put("/usuario/:id", (req,res) =>{
    const {params:{id}} = req;
    validationId(id)
    let bodyActualizado = req.body;

    Usuario.findByIdAndUpdate(id, bodyActualizado, (err,usuarioActualizado) =>{
        if(err){res.status(500).send(`La cuenta no ha podido actualizarse: ${err.message}`)}
        res.status(200).send(usuarioActualizado)
    })
    .catch(console.log)
})


module.exports = usuarioRouter;