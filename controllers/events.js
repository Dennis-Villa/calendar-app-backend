const { response } = require('express');
const Evento = require('../models/Evento');
const { generarJWT } = require('../helpers/jwt');

const getEventos = async(req, res = response) => {

    try{
        const eventos = await Evento.find().populate('user', 'name');

        res.status(201).json({
            ok: true,
            eventos
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    };

};

const crearEvento = async(req, res = response) => {

    try {

        newEvent = new Evento(req.body);

        newEvent.user = req.uid;

        const eventoGuardado = await newEvent.save();

        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    };

};

const actualizarEvento = async(req, res = response) => {

    try {
        const eventoId = req.params.id;
        const uid = req.uid;

        const evento = await Evento.findById(eventoId);

        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        };

        if( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        };

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, newEvent, { new: true } );

        res.status(201).json({
            ok: true,
            eventoActualizado
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    };

};

const eliminarEvento = async(req, res = response) => {

    try {
        const eventoId = req.params.id;
        const uid = req.uid;

        const evento = await Evento.findById(eventoId);

        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        };

        if( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de borrar este evento'
            });
        }

        const eventoEliminado = await Evento.findByIdAndDelete( eventoId);

        res.status(201).json({
            ok: true,
            eventoEliminado
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    };

};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};