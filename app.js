const path = require('path');

//? Imports the express library
const express = require('express');
//? Body parser é um middleware que permite a leitura de dados enviados por formulários
const bodyParser = require('body-parser');

//? Objeto global para construir a sessão do utilizador
const session = require('express-session');
const flash = require("connect-flash");
const methodOverride = require("method-override");

//? Import das routes dos admins
const auth = require('./routes/auth');
const mainRoutes = require('./routes/main');

//? APP vai guardar todas as funcionalidades do express
const app = express();

//? Utilizamos a seguinte syntax para dizer ao EXPRESS que temos um template engine que queremos utilizar
app.set('view engine', 'ejs');
//? Dizemos ao express onde estão as views referentes ao template engine que queremos utilizar
app.set('views', 'views');


//? Traduz a informação enviada como resposta, funciona exatamento como o buffer, mas de forma automâtica e dinâmica
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(
    session({
      secret: 'CR7', // Replace with a secure key
      resave: false,
      saveUninitialized: true,
    //   cookie: { maxAge: 60000 }, // 1-minute session timeout
    })
);
app.use(flash());

//? Ficheiros definidos de form estática, desta forma pode
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//? Middleware para disponibilizar mensagens para as views
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

//? Como agora separamos os pedidos referentes a diferentes tipos de ações/conteúdos
//? apenas temos de chamar o app.use e passar o ficheir que contém o trabatamento de cada um desses tipos de conteúdos
//* Ter em atenção a ordem de cima para baixo dos tipos de request.
app.use('/auth', auth.router);
app.use(mainRoutes.router);

//? Makes the server run, in the port 3k
app.listen(4000);   

