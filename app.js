const express = require('express');
const body_parser = require('body-parser');
// const sequelize = require('./sequelize');

const app = express();
app.use(body_parser.json());

const port = 4005;

require('./route/city.route')(app);

app.listen(port, () => {
    console.log(`Running on http://localhost: ${port}`);
})
