const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }

});

const Usuario = model('Usuario', UsuarioSchema);

module.exports = Usuario;
