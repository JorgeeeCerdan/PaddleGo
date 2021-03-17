// Importación de modulos
const express = require(`express`);
const pistaRouter = express.Router();
const pista = require("../models/pista.js");
const {comprobarToken} = require("../controllers/authToken")

// GET - Publica - Consulta de pistas
pistaRouter.get("/pistas", (req,res)=>{
    pista.find({}, (err, pista) => {
        if(err){res.status(400).send(`No se pudo mostrar las pistas del centro`);}
        res.json(pista);
    })
    .catch(console.log)
})

// GET - Privada - Consulta individual de pista
pistaRouter.get("/pista/:id", comprobarToken, (req, res) => {
    const {params: {id}} = req
    
    pista.findById((id), (err, pista) => {
        if(err){res.status(400).send(`No se pudo mostrar la pista que deseas buscar`);}
        res.json(pista);
    })
})

// POST - Privada - Añadir pista de padel
pistaRouter.post("/pista", comprobarToken, (req,res) =>{
    const nombre = req.body.nombre;
    const estado = req.body.estado;
    const tipo = req.body.tipo;
    const ubicacion = req.body.ubicacion;
    const capacidad = req.body.capacidad;

    if(!nombre){ return res.status(403).send(`Error, se requiere nombre`)}
    if(!estado){ return res.status(403).send(`Error, se requiere estado de la pista`)}
    if(!tipo){ return res.status(403).send(`Error, se necesita expecificar que tipo de pista es`)}
    if(!ubicacion){ return res.status(403).send(`Error, se necesita decir si la pista es outdoor o indoor`)}
    if(!capacidad){ return res.status(403).send(`Error, se necesita expecificar la capacidad de la pista`)}

    const pista = new Pista({
        nombre,
        estado,
        tipo,
        ubicacion,
        capacidad
    })

    pista.save()
    .then(doc => res.send(doc))
    .catch(console.log)
    res.send("Nueva pista añadida") 
    // IR ERROR
})

// DELETE - Privada - Borrar pista
pistaRouter.delete("/pista/:id", comprobarToken, (req,res)=>{
    const { params: { id } } = req
    pista.findByIdAndDelete(id)
    .catch(console.log)   
    .then(() => res.send("Pista borrada existosamente"))
})

// PUT - Privada - Modificación de caracteristicas de una pista
pistaRouter.put("/pista/:id", comprobarToken, (req,res) =>{
    const {params:{id}} = req;
    const pistaModificacion = req.body;

    pista.findByIdAndUpdate(id, pistaModificacion, (err, pistaActualizada) =>{
        if(err){res.status(500).send(`La pista no ha podido actualizarse: ${err}`)}
        res.status(200).send(pistaActualizada)
    })
    .catch(console.log)
})

// Exportación de modulos
module.exports = pistaRouter
