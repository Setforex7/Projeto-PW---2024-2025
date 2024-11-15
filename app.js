const path = require('path');

//? Imports the express library
const express = require('express');
//? Body parser é um middleware que permite a leitura de dados enviados por formulários
const bodyParser = require('body-parser');
//? APP vai guardar todas as funcionalidades do express
const app = express();



//? Import das routes dos admins
const adminRoutes = require('./routes/admin');


//? Traduz a informação enviada como resposta, funciona exatamento como o buffer, mas de forma automâtica e dinâmica
app.use(bodyParser.urlencoded({extended: false}));


app.listen(3000);   

