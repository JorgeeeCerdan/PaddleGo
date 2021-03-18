// Importación de modulos
const express = require(`express`);
const usuarioRouter = express.Router();
const Usuario = require("../models/usuario.js");
const bcrypt = require("bcrypt");
const {validationId, validationEmail, validationPassword, validationTelefono} = require("../controllers/validation");
const {crearToken, comprobarToken} = require(`../controllers/authToken`);

// GET - Privada - Consulta de usuarios
usuarioRouter.get("/usuarios", comprobarToken, (req, res) => {
    Usuario.find({}, (err, usuarios) => {
        if(err) return res.status(401).send(`No es posible mostrarte todos los usuarios`);
        if(usuarios) return res.json(usuarios);
    })
})

// GET - Privada - Consulta de usuario individual
usuarioRouter.get("/usuario", comprobarToken, (req, res) => {
    const idUsuario = req.usuario.sub
    Usuario.findById((idUsuario), (err, idUsuario) => {
        if(err) return res.status(400).send(`No pudo accederse a tu perfil`);
        if(idUsuario) return res.json(idUsuario);
    })
})

// POST - Publica - Registro de nuevos usuarios
usuarioRouter.post("/registros", async (req,res) => {
 
    try{
        const nombre = req.body.nombre
        const email = req.body.email
        const password = req.body.password
        const telefono = req.body.telefono
        
        if(!nombre){ return res.status(403).send(`Es necesario un nombre de usuario`)}
        if(!email){ return res.status(403).send(`Es necesario un email`)}
        if(!password){ return res.status(403).send(`Es necesario un password`)}
        if(!telefono){ return res.status(403).send(`Es necesario un telefono de contacto`)}

        validationEmail(email)
        validationPassword(password)
        validationTelefono(telefono)
        
        const matchNombre = await Usuario.findOne({nombre})
        if(matchNombre){ return res.status(403).send(`El nombre: ${nombre} introducido ya existe`)}
        const matchEmail = await Usuario.findOne({email})
        if(matchEmail){ return res.status(403).send(`El Email: ${email} introducido ya existe`)}
        const matchTelefono = await Usuario.findOne({telefono})
        if(matchTelefono){ return res.status(403).send(`El telefono: ${telefono} introducido ya existe`)}
        
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
            res.status(200).send({token: crearToken(usuarioToken)})
        })
    }
    catch(error){   
        res.status(403).send(error.message)
    }
})

// POST - Publica - Inicio de sesión
usuarioRouter.post("/login", async (req, res)=>{
    try {
        const email = req.body.email
        const password = req.body.password

        validationEmail(email)
        validationPassword(password)

        const usuario = await Usuario.findOne({email: req.body.email})
        if (!usuario) return res.status(401).send("El usuario no existe")            
        
        const compararPassword = await bcrypt.compare(req.body.password, usuario.password)
        if (!compararPassword) return res.status(401).send("Contraseña incorrecta")
        
        return res.status(200).send({token: crearToken(usuario)}) 

    } catch (error) {
        res.send(error.message)
    }
})

// PUT - Privada - Modificación de datos del usuario
usuarioRouter.put("/usuario", comprobarToken, (req,res) =>{
    const idUsuario = req.usuario.sub
    let bodyActualizado = req.body;

    Usuario.findByIdAndUpdate(idUsuario, bodyActualizado, (err, usuarioActualizado) =>{
        if(err) return res.status(401).send(`La cuenta no ha podido actualizarse`)
        if(usuarioActualizado) return res.status(200).send(`La cuenta se ha actualizado`)
        if(usuarioActualizado.id !== idUsuario) return res.status(401).send(`No puedes actualizar los datos`)
    })
})

// DELETE - Privada - Borrar cuenta
usuarioRouter.delete("/usuario", comprobarToken, (req,res) => {
    const borrarCuenta = req.usuario.sub
    Usuario.findByIdAndDelete(borrarCuenta, (err, cuentaEliminada) =>{
        if(err) return res.status(400).send(`Tu cuenta no pudo borrarse en estos momentos, pruebe mas tarde`)
        if(cuentaEliminada) return res.send("Usuario borrado exitosamente")
    })
})

// Exportación de modulos
module.exports = usuarioRouter;