const express=require('express');
const app=express();
const path = require('path');
var hbs = require('express-handlebars');

app.use(express.json());

//serving static files
app.use(express.static(path.join(__dirname,'public')));

//connect mongodb
require('./server/database/database')();

//setup view engine
app.set('view engine', 'hbs');

//calling routes
app.use('/',require('./server/router'));

app.listen("3000",()=>console.log("server started on port 3000"));