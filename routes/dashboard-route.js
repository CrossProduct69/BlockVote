const express = require('express');
// var auth = require('auth'); 
const router = express.Router();
/* GET users listing. */
router.get('/dashboard',  function(req, res, next) {
    // res.render('dashboard.ejs',{email:req.session.emailAddress})
    if(req.isAuthenticated()){
        res.render('dashboard.ejs',{email:req.user.email_Address})
    }else{
        res.redirect('/login');
    }
});
module.exports = router;