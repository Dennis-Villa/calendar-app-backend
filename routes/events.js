/*
    Rutas de Eventos / Events
    host + /api/events
*/

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const isDate = require('../helpers/isDate');

// Validacion global
router.use( validarJWT );

// Obtener eventos
router.get('/', getEventos);

// Crear nuevo evento
router.post('/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').not().isEmpty(),
        check('start', 'La fecha de inicio es incorrecta').isISO8601(),
        check('end', 'La fecha de finalizacion es obligatoria').not().isEmpty(),
        check('end', 'La fecha de finalizacion es incorrecta').custom(isDate),
        validarCampos
    ],
    crearEvento);

// Actualizar evento
router.put('/:id', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').not().isEmpty(),
        check('start', 'La fecha de inicio es incorrecta').isISO8601(),
        check('end', 'La fecha de finalizacion es obligatoria').not().isEmpty(),
        check('end', 'La fecha de finalizacion es incorrecta').custom(isDate),
        validarCampos
    ],
    actualizarEvento);

// Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;