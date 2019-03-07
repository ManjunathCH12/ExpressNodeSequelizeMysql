# ExpressNodeSequelizeMysql
Get is implemented

//NPM cmds
mkdir myapp
$ cd myapp
$ npm init
$ npm install --save express body-parser morgan   //dependencies
$ npm i -D nodemon   //restart the server every time
$ npm start

//sequelize
$ npm install -g sequelize-cli        
$ npm install --save sequelize   
$ npm install --save mysql2     //dependencies
$ sequelize init // generates - config/migrations/models/seeders


$ sequelize model:create --name Company --attributes name:string   
//generate model and migrations files. We are going to have two models, Company and Employee.

$ sequelize db:migrate   //to persist the models to the database by running the migrations.
