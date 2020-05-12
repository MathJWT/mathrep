const mongoose = require('mongoose');
const validator = require('validator');
const async = require('async');
const mongoosePaginate = require('mongoose-paginate');

const contatoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: false},
    telefone: {type: String, required: true, default: ''},
    estado: {type: String, required: false, default: ''},
    createdIn: {type:Date, default: Date.now},
});

const contatoModel = mongoose.model('Contatos', contatoSchema);
function Contato (body) { 
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.buscaContatos = async function() {
    const findContats = await contatoModel.find()
    .sort({criadoEm: -1}) // 1 = crescente | -1 = decrescente
    return findContats
}

Contato.searchById = async function (id) {
    const user = await contatoModel.findById(id)
    return user;
}

Contato.prototype.register = async function () {
    this.valida();

    if(this.errors.length > 0) return;

    this.contato = await contatoModel.create(this.body);        
    
    
}// Base de dados = always async await


Contato.prototype.valida = function () {
    this.cleanUp();
    
    if (this.body.email && !validator.default.isEmail(this.body.email)) {
        this.errors.push('Email inválido!')  
    }

    if (!this.body.email) {
        this.errors.push('Email inválido.')
    }

    if (!this.body.email && !this.body.nome) {
        this.errors.push("Nenhum contato está sendo cadastrado.");
        return;
    }    

    if (!this.body.nome || this.body.nome.trim().length == 0) {
        this.errors.push('O nome é obrigatório.')
    }

};

//Still need to verify, in due to the fact that i didnt push the errors.
Contato.delete = async function(id) {
    if (typeof id !== 'string') return;
    const contato = await contatoModel.findByIdAndDelete(id);
    return contato;
};

Contato.prototype.cleanUp = function (){
    for (let key in this.body) {
       if (typeof this.body[key] !== 'string') {
           this.body[key] = '';
       }
    };

};

Contato.prototype.edit = async function (id) {
    if (typeof id !== 'string') return;
    this.valida();
    if (this.errors.length > 0) return;
    this.contato = await contatoModel.findByIdAndUpdate(id, this.body, { new: true });
};

module.exports = Contato;