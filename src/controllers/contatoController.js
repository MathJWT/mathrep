const Contato = require('../models/contatoModel');
module.exports = () => {
    const adicionarContato = (req, res) => {
        res.render('adicionarContato', {
            contato: {},

        })
    }
    
    const fullEdition = async (req, res) => {
      try{ 
        if (!req.params.id) return res.send('404');
        const contato = new Contato(req.body);
        contato.contato = await contato.edit(req.params.id); 
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => {
                res.redirect('back')
                return;
            })
            return
        }

        req.flash('success', 'Contato editado com sucesso!');
        req.session.save(() => {
            return res.redirect(`/adicionar-contato/edit/${req.params.id}`); 
        })
      } catch(e) {
          console.log(e)
      }
    } 

    //Still need to verify - 29/04 - 13:55
    const deleteContato = async (req, res) => {
        console.log('Cheguei no deleteContato - contatoController')
        if (!req.params.id) return;   
        
        const contato = await Contato.delete(req.params.id);
        if (!contato) return;
               
        req.flash('success', 'Este contato foi removido com sucesso!');
        req.session.save( () => {
            return res.redirect('back');
        })} 
    

    const editContato = async (req, res) => {
        if (!req.params.id) {
            return res.render('404');
        }
        const contato = await Contato.searchById(req.params.id)
        if (!contato) {
            return;
        };

        res.render('adicionarContato', { contato });
    }

    const register = async (req, res) => {
       try {
        const contato = new Contato(req.body);
        await contato.register();
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save( () => res.redirect('back'))
            return
        };

        req.flash('success' , 'Contato registrado com sucesso!');
        req.session.save(() => res.redirect(`/`))
       } catch(e) {
           console.log(e);
        }
    }

    return {
        adicionarContato,
        register,
        editContato, 
        fullEdition,
        deleteContato,
    }
}