const contato = require('../models/contatoModel');

module.exports = () => {
  const index = async (req, res) => {
    const contatos = await contato.buscaContatos();
    res.render('index', {
      title: 'Home',
      contatos,
    });
    return;
  }

  return {
    index,

  }
}

