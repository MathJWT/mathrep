const Login = require('../models/loginModel');

module.exports = () => {
    const index = (req, res) => {
        console.log('I GOT INTO THE SIGN UP PAGE')
        console.log(req.session.user)
        res.render('login', {
            title: 'Login'
        });
    };

    const logout = (req, res) => {
        req.session.destroy();
        res.redirect('/');
    };
 
    const register = async (req, res) => { 
        try{ 
            const login = new Login(req.body);
            await login.register()
        
            if (login.errors.length > 0) {
                    req.flash('errors', login.errors);
                    req.session.save( () => { //dps de salvar o session, dei um redirect
                        return res.redirect('back');
                    });
                    return;
            };

            req.flash('success', 'Usuário cadastrado com sucesso!');
            req.session.save(() => {
                return res.redirect('back')
            })
            } catch(e) {
                console.log(e)
            }
    }

    const logar = async (req, res) => { 
        try{ 
            const login = new Login(req.body);
            await login.signIn();
        
            if (login.errors.length > 0) {
                    req.flash('errors', login.errors);
                    req.session.save( () => { //dps de salvar o session, dei um redirect
                        return res.redirect('back');
                    });
                    return;
            };
            req.session.user = login.user;
            req.session.save(() => {
                return res.redirect('/')
            })
            } catch(e) {
                console.log(e)
            }
    }    
    
    const login = (req, res) => {
        console.log(req.session.user)
        res.render('register', {
            title: 'Register'
        })
    }

    return {
        index,
        register,
        login,
        logar,
        logout
    }
}