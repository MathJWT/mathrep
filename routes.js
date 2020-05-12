const express = require('express');
const route = express.Router();
const indexController = require('./src/controllers/indexController')();
const loginController = require('./src/controllers/loginController')();
const middlewareGlobal = require('./src/middlewares/middleware')();
const contatoController = require('./src/controllers/contatoController')();

// Rotas da home
route.get('/', indexController.index);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/index', loginController.logar);
route.get('/login/logout', middlewareGlobal.loginRequired, loginController.logout);

//Rotas de cadastro/register/index
route.get('/register/index', loginController.login);
route.post('/register/index', loginController.register);

//Rota de adicionar contatos
route.get('/adicionar-contato', middlewareGlobal.loginRequired, contatoController.adicionarContato);
route.post('/adicionar-contato/', middlewareGlobal.loginRequired, contatoController.register);

//Rota de editar contato
route.get('/adicionar-contato/edit/:id', middlewareGlobal.loginRequired, contatoController.editContato);
route.post('/adicionar-contato/edit/:id', middlewareGlobal.loginRequired, contatoController.fullEdition); 

// Rota de delete
route.get("/contato/delete/:id", middlewareGlobal.loginRequired, contatoController.deleteContato)

module.exports = route;
