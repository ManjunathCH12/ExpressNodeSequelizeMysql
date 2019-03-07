module.exports = function (app) {
    
    const City = require('../controller/city.controller');

    app.get('/api/city', City.findAll);

    app.get('/api/city/:page', City.findByPage);

    app.get('/api/join', City.cityBelongtoCountry);

    app.get('/api/selectallcities/:code', City.selectAll);

    app.get('/api/findcountry', City.findCountry);
}