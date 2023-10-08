const { DateTime } = require("luxon");

const isDate = ( value ) => {
    
    if( !value ){
        return false;
    }

    const date = DateTime.fromISO(value);
    if( date.isValid ){
        return true;
    }
    else {
        return false;
    }
    
};

module.exports = isDate;