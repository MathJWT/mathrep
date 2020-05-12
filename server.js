require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, {useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database.')
    app.emit('pronto');
  })
  .catch(e => console.log(e));
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const middlewareGlobal = require('./src/middlewares/middleware')();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
  secret: 'akasdfj0út23453456+54qt23qv  qwf qwer qwer qewr asdasdasda a6()',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
//git = software de versionamento
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
// Nossos próprios middlewares
app.use(middlewareGlobal.checkCsrfToken);
app.use(middlewareGlobal.checkCsrfErr)
app.use(middlewareGlobal.errs)
app.use(routes);

app.on('pronto', () => {
  app.listen(3001 , () => {
    console.log('Acessar http://localhost:3001');
    console.log('Servidor executando na porta 3001');
  });
});
