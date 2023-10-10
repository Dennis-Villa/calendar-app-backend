const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect('mongodb+srv://MERN_USER:hukXvHKIoWU3YGMo@cluster0.rwr7o3q.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp');

        console.log('DB Online');
    
    }
    catch (err) {
        console.log(err);
        throw new Error('Error a la hora de inicializar la DB');
    }

};

module.exports = {
    dbConnection
};
