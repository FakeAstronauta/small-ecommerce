const { format } = require('timeago.js');
const bcrypt = require('bcryptjs');

const helpers = {};

helpers.timeago = (timestamp) => {
    return format(timestamp);
}

// este metodo es para el registro
helpers.encryptedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

// este metodo es para el logeo
helpers.matchPassword = async (password, savedPassword) => {
    try{
        return await bcrypt.compare(password, savedPassword);
    }catch(e){
        console.log(e);
    }
    
};

module.exports = helpers;