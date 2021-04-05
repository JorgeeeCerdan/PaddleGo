// Importación de modulos
const express = require(`express`);
const pistaRouter = express.Router();
const pista = require("../models/pista.js");
const {comprobarToken} = require("../controllers/authToken");
const { validationId, validationPista } = require("../controllers/validation.js");

// GET - Privada - Consulta de pistas
pistaRouter.get("/pistas", comprobarToken, (req,res)=>{
    try{
        pista.find({}, (err, pistas) => {
            if(err) res.status(400).send(`No se pudo mostrar las pistas del centro`)
            else{res.status(200).send({
                message : `Lista de pistas`,
                pistas
            })}
        })
    }     
    catch{
        res.status(400).send({ message : `Error al mostrar las pistas solicitadas`})
    }   
})

// GET - Privada - Consulta individual de pista
pistaRouter.get("/pista/:id", comprobarToken, (req, res) => {

    try{
        const {params: { id }} = req
        validationId(id)

        pista.findById((id), (err, pista) => {
            if(err){res.status(400).send(`No se pudo mostrar la pista que deseas buscar`);}
            else {res.status(200).send({
                message : `Consulta individual de pista`,
                pista
            })} 
        })
    }
    catch{
        res.status(400).send({ message : `Error al mostrar la pista solicitada`})
    }
})

// POST - Privada - Añadir pista de padel
pistaRouter.post("/pista", comprobarToken, (req,res) =>{
    try{
        const nombre = req.body.nombre;
        const estado = req.body.estado;
        const tipo = req.body.tipo;
        const ubicacion = req.body.ubicacion;
        const capacidad = req.body.capacidad;

        validationPista(nombre, estado, tipo, ubicacion, capacidad)

        const pista = new Pista({
            nombre,
            estado,
            tipo,
            ubicacion,
            capacidad
        })

        pista.save()
        .then(pista => res.status(200).send({ 
            message: `Pista creada correctamente y añadida`,
            pista
        }))
    }    
    catch{
        res.status(400).send({ message : `Error al crear la pista`})
    }

})

// PUT - Privada - Modificación de caracteristicas de una pista
pistaRouter.put("/pista/:id", comprobarToken, (req,res) =>{
    try{
        const {params:{id}} = req;
        const pistaModificacion = req.body;
        validationId(id)
        
        pista.findByIdAndUpdate(id, pistaModificacion, (err, pistaActualizada) =>{
            if(err) res.status(400).send(`La pista no ha podido actualizarse: ${err}`)
            else{ res.status(201).send({
                message : `La pista ha sido modificada`,
                pistaActualizada
            })}
        })
    }    
    catch{
        res.status(400).send({ message : `Error al modificar caracteristicas de la pista`})
    }
})

// DELETE - Privada - Borrar pista
pistaRouter.delete("/pista/:id", comprobarToken, (req,res)=>{
    try{
        const { params: { id } } = req
        validationId(id)

        pista.findByIdAndDelete(id, (error) =>{
            if(error) return res.status(400).send({message:'No se pudo borrar la reserva'})
            
            pista.deleteOne(pista)
            .then( res.status(200).send({ message : `La reserva fue borrada existosamente.`}))
        })
    }
    catch{
        res.status(400).send({ message : `Error al borrar la pista`})
    }
})

// Exportación de modulos
module.exports = pistaRouter
