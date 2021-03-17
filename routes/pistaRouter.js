// Importación de modulos
const express = require(`express`);
const pistaRouter = express.Router();
const pista = require("../models/pista.js");
const {comprobarToken} = require("../controllers/authToken")

// GET - Publica - Consulta de pistas
pistaRouter.get("/pistas", (req,res)=>{
    pista.find({}, (err, pista) => {
        if(err){res.status(400).send(err.response.data);}
        res.json(pista);
    })
    .catch(console.log)
})

// GET - Privada - Consulta individual de pista
pistaRouter.get("/pista/:id", comprobarToken, (req, res) => {
    const {params: {id}} = req
    pista.findById((id), (err, pista) => {
        if(err){res.status(400).send(err.response.data);}
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

    const pista = new Pista({
        nombre: nombre,
        estado: estado,
        tipo: tipo,
        ubicacion: ubicacion,
        capacidad: capacidad
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
