const {response} = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        let newUser = await Usuario.findOne({ email: email });

        if( !!newUser ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        newUser = new Usuario(req.body);

        // Encriptar contraseña
        const saltRounds = 10;

        await bcrypt.hash( password, saltRounds ).then( ( hash )  => {
                newUser.password = hash;
        });

        await newUser.save();

        // Generar JWT
        const token = await generarJWT(newUser.id, newUser.name);

        res.status(201).json({
            ok: true,
            uid: newUser.id,
            name: newUser.name,
            token
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

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;
    
    try{
        const user = await Usuario.findOne({ email: email });

        if( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese email'
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar JWT
        const token = await generarJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
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

const revalidarToken = async(req, res = response) => {

    const { uid, name } = req;

    // Generar JWT
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token,
        uid,
        name
    });

}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};