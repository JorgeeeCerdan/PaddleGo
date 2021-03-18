// Importación de modulos
const express = require(`express`);
const reservaRouter = express.Router();
const Reserva = require("../models/reserva.js");
const {comprobarToken} = require("../controllers/authToken");

// GET - Publica - Consulta de reservas
reservaRouter.get("/reservas", comprobarToken, (req, res) =>{
    Reserva.find({}, (err, reservas) => {
        if(err){res.status(400).send(`No se pudo mostrar las reservas`);}
        res.json(reservas);
    })
    .catch(console.log)
})

// POST - Privada - Realizar reserva de pista
reservaRouter.post("/reserva", comprobarToken,  (req, res) => {
    const idUsuario =  req.usuario.sub;
    const idPista =  req.body.idPista;

    if(!idUsuario){ return res.status(403).send(`Error, no se encontro usuario asociado a la reserva`)}
    if(!idPista){ return res.status(403).send(`Error, no se encontro pista asociada a la reserva`)}

    const reserva =  new Reserva({
        idUsuario:idUsuario,
        idPista:idPista
    })
    
    reserva.save()
    .then(doc => console.log(doc))
    .then(() => res.send(`Reserva realizada correctamente`))
    .catch(console.error)
})

// GET - Privada - Consulta de reserva concreta realizada por el usuario
reservaRouter.get("/reserva/:id", comprobarToken, (req,res)=>{
    const {params: {id}} = req
    Reserva.findById(id)
    .populate("idUsuario","nombre")
    .populate("idPista",["nombre","estado"])
    .exec((err, reserva) => {
        if(err) return res.status(400).send(`Error, no se pudo re`)
        res.json(reserva)
    })
})

// GET - Privada - Historial de reservas realizadas por un usuario
reservaRouter.get("/reservas/usuario", comprobarToken, (req, res)=>{
    const idUsuario = req.usuario.sub
    Reserva.find({idUsuario})
    .populate("idUsuario","nombre")
    .populate("idPista",["nombre","ubicacion"])
    .exec((err, reservas)=>{
        if(err){res.status(400).send(err.message);}
       res.send(reservas)
    })
})

// GET - Privada - Conocer cuantas veces se ha reservado la pista y por quien
reservaRouter.get("/reservas/pista/:id", comprobarToken, (req, res)=>{
    // const {params: {id}} = req
    const idUsuario = req.usuario.sub
    Reserva.find({idUsuario})
    .populate("idUsuario","nombre")
    .populate("idPista",["nombre","ubicacion"])
    .exec((err, reservas)=>{
        if(err){res.status(400).send(err.message);}
       res.send(reservas)
    })
})

// DELETE - Privada - Borrar reserva realizada
reservaRouter.delete("/reserva/:id", comprobarToken, (req,res)=>{
    const { params: { id } } = req

    Reserva.findById(id, (err, reserva) =>{
        if(err){ 
            return res.status(401).send('No se pudo borrar la reserva')
        }
        if(reserva.idUsuario !== req.usuario.sub){
            return res.status(401).send(`Solamente quien hizo la reserva puede borrarla`)
        }
        reserva.deleteOne()
        .then(() => res.send("Reserva borrada existosamente"))
    })
    .catch(console.log)
})

// Exportación de modulos
module.exports = reservaRouter