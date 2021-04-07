// Importación de modulos
const express = require(`express`);
const usuarioRouter = express.Router();
const Usuario = require("../models/usuario.js");
const bcrypt = require("bcrypt");
const {validationRegister, validationLogin} = require("../controllers/validation");
const {crearToken, comprobarToken} = require(`../controllers/authToken`);

// GET - Privada - Consulta de usuarios
usuarioRouter.get("/usuarios", comprobarToken, (req, res) => {
    try{
        Usuario.find({}, (error, usuarios) => {
            if(error) return res.status(400).send(`No es posible mostrarte todos los usuarios`)
            else{ res.status(200).send({
                message : `Lista de usuarios registrados`,
                usuarios
            })}
        })
    }
    catch{
        res.status(400).send({ message : `Error no se ha podido mostrar los usuarios`})
    }
})

// GET - Privada - Consulta de usuario individual
usuarioRouter.get("/usuario", comprobarToken, (req, res) => {
    try{
        const id = req.usuario.sub
        Usuario.findById((id), (error, usuario) => {
            if(error) res.status(400).send(`No se pudo mostrar el usuario`)
            else { res.status(200).send({
                message : `Información sobre ${usuario.nombre}`,
                usuario
            })}
        })
    }
    catch{
        res.status(400).send({ message : `Error no se ha podido mostrar el usuario ${usuario.nombre}`})
    }
})

// POST - Publica - Registro de nuevos usuarios
usuarioRouter.post("/registro", async (req,res) => {
    try{
        const nombre = await req.body.nombre
        const email = await req.body.email
        const password = await req.body.password
        const telefono = await req.body.telefono

        validationRegister(nombre, email, password, telefono)
        
        const matchNombre = await Usuario.findOne({nombre})
        if(matchNombre){ return res.status(400).send(`El nombre: ${nombre} introducido ya existe`)}
        const matchEmail = await Usuario.findOne({email})
        if(matchEmail){ return res.status(400).send(`El Email: ${email} introducido ya existe`)}
        const matchTelefono = await Usuario.findOne({telefono})
        if(matchTelefono){ return res.status(400).send(`El telefono: ${telefono} introducido ya existe`)}
        
        // Hash password
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        
        const usuario = new Usuario({
            nombre,
            email,
            password: hashPassword,
            telefono
        })

        usuario.save()
        .then(usuarioToken => {
            if(usuarioToken) res.status(200).send({
                message : `${usuario.nombre} tu cuenta fue creada correctamente`,
                token: crearToken(usuarioToken)
            })
        })
    }
    catch{   
        res.status(400).send({message: `Error al crear al registrarte, compruebe los datos del registro`})
    }
})

// POST - Publica - Inicio de sesión
usuarioRouter.post("/login", async (req, res)=>{
    try {
        const email = await req.body.email
        const password = await req.body.password
        validationLogin(email, password)

        const usuario = await Usuario.findOne({email: req.body.email})
        if (!usuario) return res.status(401).send("El usuario no existe")            
        
        const compararPassword = await bcrypt.compare(req.body.password, usuario.password)
        if (!compararPassword) return res.status(401).send("Contraseña incorrecta")
        
        return res.status(200).send({
            message: `Bienvenido a tu sesión ${usuario.nombre}`,
            token: crearToken(usuario)
        }) 

    } catch{
        res.status(400).send(`Error al iniciar sesion, vuelva a intentarlo`)
    }
})

// PUT - Privada - Modificación de datos del usuario
usuarioRouter.put("/usuario", comprobarToken, (req,res) =>{
    const idUsuario = req.usuario.sub
    let bodyActualizado = req.body;

    Usuario.findByIdAndUpdate(idUsuario, bodyActualizado, (err, usuarioActualizado) =>{
        if(err) return res.status(400).send(`La cuenta no ha podido actualizarse`)
        if(usuarioActualizado) return res.status(201).send(`La cuenta se ha actualizado`)
        if(usuarioActualizado.id !== idUsuario) return res.status(401).send(`No puedes actualizar los datos`)
    })
})

// DELETE - Privada - Borrar cuenta
usuarioRouter.delete("/usuario", comprobarToken, (req,res) => {
    const id = req.usuario.sub
    Usuario.findByIdAndDelete(id, (err, cuentaEliminada) =>{
        if(err) return res.status(400).send(`Tu cuenta no pudo borrarse en estos momentos, pruebe mas tarde`)
        if(cuentaEliminada) return res.send("Usuario borrado exitosamente")
    })
})

// Exportación de modulos
module.exports = usuarioRouter;