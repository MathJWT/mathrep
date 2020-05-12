const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const async = require('async');

const loginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
})

const loginModel = mongoose.model('Login', loginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.user = null;
        this.errors = [];
    };
        
    async signIn () {
        this.valida();    
        if (this.errors.length > 0) return;                    
        this.user = await loginModel.findOne({ email: this.body.email })
        
        if(!this.user) {
            this.errors.push('Usuário não existe!');
            return;
        }
    
        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida')
            this.user = null;
            return;
        }
    }

    async register() {
        this.valida();

        if (this.errors.length > 0) return;
        await this.userExists();
        if(this.errors.length > 0) return;
        
        this.generateSalt();
        this.user = await loginModel.create(this.body);        
    }// Base de dados = always async await

    generateSalt() {
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        return this.body.password;
    }

    async userExists() {
        this.user = await loginModel.findOne({email: this.body.email});
        if(this.user) {
            this.errors.push('Usuário existente');
        };

    }
    
    valida() {
        this.cleanUp();
        
        if (!validator.default.isEmail(this.body.email)) {
            this.errors.push('Email inválido!')  
        }

        if (this.body.password.length < 5 || this.body.password.length > 50) {
            this.errors.push('A senha precisa ter entre 5 e 50 caracteres.')
        };

    };

    cleanUp() {
        for (let key in this.body) {
           if (typeof this.body[key] !== 'string') {
               this.body[key] = '';
           }
        }
        
    }

}

module.exports = Login 