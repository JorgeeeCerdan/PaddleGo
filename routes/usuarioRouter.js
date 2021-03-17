// Importación de modulos
const express = require(`express`);
const usuarioRouter = express.Router();
const Usuario = require("../models/usuario.js");
const bcrypt = require("bcrypt");
const {validationId, validationEmail, validationPassword, validationTelefono} = require("../controllers/validation");
const {crearToken, comprobarToken} = require(`../controllers/authToken`);

// GET - Publica - Consulta de usuarios
usuarioRouter.get("/usuarios", (req, res) => {
    Usuario.find({}, (err, usuario) => {
        if(err){res.status(401).send(err.response.data);}
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
usuarioRouter.put("/usuario/:id", comprobarToken, (req,res) =>{
    const {params:{id}} = req;
    let bodyActualizado = req.body;
    validationId(id)

    Usuario.findByIdAndUpdate(id, bodyActualizado, (err,usuarioActualizado) =>{
        if(err){res.status(500).send(`La cuenta no ha podido actualizarse`)}
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