const path = require('path');

//? Imports the express library
const express = require('express');
//? Body parser é um middleware que permite a leitura de dados enviados por formulários
const bodyParser = require('body-parser');

//? Import das routes dos admins
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');

//? APP vai guardar todas as funcionalidades do express
const app = express();

//? Utilizamos a seguinte syntax para dizer ao EXPRESS que temos um template engine que queremos utilizar
app.set('view engine', 'ejs');
//? Dizemos ao express onde estão as views referentes ao template engine que queremos utilizar
app.set('views', 'views');


//? Traduz a informação enviada como resposta, funciona exatamento como o buffer, mas de forma automâtica e dinâmica
app.use(bodyParser.urlencoded({extended: false}));

//? Ficheiros definidos de form estática, desta forma pode
app.use(express.static(path.join(__dirname, 'public')));


//? Como agora separamos os pedidos referentes a diferentes tipos de ações/conteúdos
//? apenas temos de chamar o app.use e passar o ficheir que contém o trabatamento de cada um desses tipos de conteúdos
//* Ter em atenção a ordem de cima para baixo dos tipos de request.
app.use('/admin', adminRoutes.router);
app.use('/', userRoutes.router);

//? Makes the server run, in the port 3k
app.listen(4000);   

