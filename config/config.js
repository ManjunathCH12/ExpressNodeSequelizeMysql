exports.setConfig = function(value) {
    if(value == 0) {
        console.log('I am in development environment');
        exports.properties = require('./development.js');
    } else if(value == 1) {
        console.log('I am in pre-production environment');
    } else {
        console.log('I am in production environment');
    }
}