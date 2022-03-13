var http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');

const projetosServiceProxy = httpProxy('https://sw-pessoas-api.herokuapp.com');
const pessoasServiceProxy = httpProxy('https://sw-projetos-api.herokuapp.com');

// Proxy request
// rota para projetos e todos os métodos
app.all('/projetos', (req, res, next) => {
    projetosServiceProxy(req, res, next);
})
// rota para projetos e todos os métodos com um parâmetro ID
app.all('/projetos/:id', (req, res, next) => {
    projetosServiceProxy(req, res, next);
})
// rota para pessoas e todos os métodos
app.all('/pessoas', (req, res, next) => {
    pessoasServiceProxy(req, res, next);
})
// rota para pessoas e todos os métodos com um parâmetro ID
app.all('/pessoas/:id', (req, res, next) => {
    pessoasServiceProxy(req, res, next);
})

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var server = http.createServer(app);
server.listen(process.env.PORT || 3000);