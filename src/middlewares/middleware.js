module.exports = () => {
  const checkCsrfErr = (err, req, res, next) => {
    if (err) {
      res.render('404');
      return;
    }
    next()
  };

  const loginRequired = (req, res, next) => {
    if (!req.session.user) {
      req.flash('errors', 'Você precisa fazer o login.');
      req.session.save(() => {
        res.redirect('/');
        return
      })
    return
    }
    next();
  }

  const errs = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
  };

  const checkCsrfToken = (req, res, next) => {
    res.locals.csrf = req.csrfToken(); //Para todos os forms - post
    next()
  };

  return {
    loginRequired,
    checkCsrfToken,
    checkCsrfErr,
    errs
  }
}