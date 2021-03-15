const express = require(`express`);
const reservaRouter = express.Router();
const Reserva = require("../models/reserva.js");

// CONSUTAR RESERVAS
reservaRouter.get("/reservas", (req, res) =>{
    Reserva.find({}, (err, reservas) => {
        if(err){res.status(400).send(err.response.data);}
        res.json(reservas);
    })
    .catch(console.log)
})

// CONSULTAR UNA RESERVA
reservaRouter.get("/reserva/:id",(req,res)=>{
    const {params: {id}} = req
    Reserva.findById(id)
    .populate("idUsuario","nombre")
    .populate("idPista",["nombre","estado"])
    .exec((err, reservas) => {
        if(err) res.status(400).send(err.message)
        res.json(reservas)
    })
    .catch(console.log)
})

// HACER RESERVA
reservaRouter.post("/reserva", (req, res) => {
    const idUsuario = req.body.idUsuario;
    const idPista = req.body.idPista;

    const reserva = new Reserva({
        idUsuario:idUsuario,
        idPista:idPista
    })

    reserva.save()
    .catch(console.log)
    .then(doc => res.send(doc))
    .then(() => res.send(`Reserva realizada correctamente`))
})

// SACAR LAS PISTAS RESERVADAS DEL USUARIO POR INDIVIDUAL
// CUANTAS RESERVAS TIENE EL USUARIO
reservaRouter.get("/reservas/usuario/:id", (req, res)=>{
    const {params: {id}} = req
    Reserva.find({idUsuario:id})
    .populate("idUsuario","nombre")
    .populate("idPista",["nombre","ubicacion"])
    .exec((err, reservas)=>{
        if(err){res.status(400).send(err.message);}
       res.send(reservas)
    })
})

// SACAR LAS PISTAS RESERVADAS DEL USUARIO POR INDIVIDUAL
// CUANTAS VECES SE HA RESERVADO ESA PISTA + QUIEN LA HA RESERVADO
reservaRouter.get("/reservas/pista/:id", (req, res)=>{
    const {params: {id}} = req
    Reserva.find({idPista:id})
    .populate("idUsuario","nombre")
    .populate("idPista",["nombre","ubicacion"])
    .exec((err, reservas)=>{
        if(err){res.status(400).send(err.message);}
       res.send(reservas)
    })
    .catch(console.log)
})

// BORRAR RESERVA
reservaRouter.delete("/reserva/:id", (req,res)=>{
    const { params: { id } } = req
    Reserva.findByIdAndDelete(id, (err)=>{
        if(err){res.status(400).send(err.message);}
    })
    .catch(console.log)   
    .then(() => res.send("Reserva borrada existosamente"))
})


module.exports = reservaRouter