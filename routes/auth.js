/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/register',
    [
        check('name', 'El nombre debe tener al menos 5 caracteres').trim().isLength({ min:5 }),
        check('email', 'El email es obligatorio').trim().not().isEmpty(),
        check('email', 'El email es incorrecto').isEmail(),
        check('password', 'El password debe de ser de al menos 6 caracteres').isLength({ min:6 }),
        validarCampos
    ], 
    crearUsuario
);

router.post('/',
    [
        check('email', 'El email es obligatorio').trim().not().isEmpty(),
        check('email', 'El email es incorrecto').isEmail(),
        check('password', 'El password debe de ser de al menos 6 caracteres').isLength({ min:6 }),
        validarCampos
    ], 
    loginUsuario);

router.get('/renew',
    [
        validarJWT
    ],
    revalidarToken);

module.exports = router;