// Importación de modulos
const express = require(`express`);
const reservaRouter = express.Router();
const Reserva = require("../models/reserva.js");
const {comprobarToken} = require("../controllers/authToken");

// GET - Publica - Consulta de reservas
reservaRouter.get("/reservas", comprobarToken, (req, res) =>{
    try{
    Reserva.find({}, (err, reservas) => {
        if(err) return res.status(401).send(`No es fue posible mostrarte todas las reservas`)
        else{res.status(200).send({
            message : `Todas las reservas realizadas hasta el momento.`,
            reservas
        })}
    })
    }
    catch(error){
        res.status(400).send({ message : `Error al mostrar las reservas`, error})
    }
})

// GET - Privada - Consulta de reserva concreta realizada por el usuario
reservaRouter.get("/reserva/:id", comprobarToken, (req,res)=>{
    try{
        const {params: {id}} = req
        Reserva.findById(id)
        .populate("idUsuario","nombre")
        .populate("idPista",["nombre","estado"])
        .exec((error, reserva) => {
            if(error) return res.status(400).send(`Error, no se consiguio mostrar la reserva`)
            else{ res.status(200).send({
                message : `Datos de la reserva ${reserva.id} realizada a nombre de ${reserva.idUsuario.nombre}`,
                reserva
            })}
        })
    }
    catch{
        res.status(400).send({message : `Por motivos desconocidos no se puede mostrar la reserva`})
    }
})

// POST - Privada - Realizar reserva de pista
reservaRouter.post("/reserva", comprobarToken,  (req, res) => {
    try{
        const idUsuario =  req.usuario.sub;
        const idPista =  req.body.idPista;

        if(!idUsuario){ return res.status(403).send(`Error, no se encontro usuario asociado a la reserva`)}
        if(!idPista){ return res.status(403).send(`Error, no se encontro pista asociada a la reserva`)}

        const reserva =  new Reserva({
            idUsuario:idUsuario,
            idPista:idPista
        })

        reserva.save()
        .then(reserva => {
            if(reserva) res.status(200).send({message : `Reserva creada correctamente`, reserva: reserva})
        })
    }
    catch{
        res.status(400).send({message: `Error al reservar la pista`})
    }
})

// GET - Privada - Historial de reservas realizadas por un usuario
reservaRouter.get("/reservas/usuario", comprobarToken, (req, res)=>{
    try{
        const idUsuario = req.usuario.sub
        Reserva.find({idUsuario})
        .populate("idUsuario","nombre")
        .populate("idPista",["nombre","ubicacion"])
        .exec((error, reservas)=>{
            if(error) res.status(400).send(err.message)
            else{res.status(200).send({
                message : `Historial de reservas realizadas`,
                reservas
            })}
        })
    }
    catch{
        res.status(400).send({message:`Error, no se pudo mostrar el historial de reservas`})
    }
})

// GET - Privada - Conocer cuantas veces se ha reservado la pista y por quien
reservaRouter.get("/reservas/pista/:id", comprobarToken, (req, res)=>{
    try{
        const idUsuario = req.usuario.sub
        Reserva.find({idUsuario})
        .populate("idUsuario","nombre")
        .populate("idPista",["nombre","ubicacion"])
        .exec((error, reservas)=>{
            if(error) return res.status(400).send(err.message)
            else{ res.status(200).send({
                message : `Pistas reservadas y por quien`,
                reservas
            })}
        })
    }
    catch{
        res.status(400).send({message:`Error al conocer las pistas reservadas por los usuarios`})
    }     
})

// DELETE - Privada - Borrar reserva realizada
reservaRouter.delete("/reserva/:id", comprobarToken, (req,res)=>{
    const { params: { id } } = req

    Reserva.findById(id, (err, reserva) =>{
        if(err) return res.status(400).send({message:'No se pudo borrar la reserva'})
        if(reserva.idUsuario != req.usuario.sub) return res.status(401).send(`Solamente quien hizo la reserva puede borrarla`)

        reserva.deleteOne(reserva)
        .then((reserva) => res.status(200).send({ message : `La reserva fue borrada existosamente.`, reserva}))
        .catch((error) => res.status(400).send({ message : `No se pudo borrar la reserva`, error}))
    })
})

// Exportación de modulos
module.exports = reservaRouter