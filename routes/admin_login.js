const express = require('express');
const passport = require('passport')
const router = express.Router();
const db = require('../database');
const auth = require('../validation/authValidation')
const {catchLoginErrors} = require('../middleware')


const app = express();



app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))

router.get('/adlogin', function(req, res, next) {
  res.render('admin_login.ejs');
});


// router.post('/adlogin', function(req, res){
//     var emailAddress = req.body.email_address;
//     var password = req.body.password;

//     var sql='SELECT * FROM registration WHERE email_address =? AND password =?';
//     db.query(sql, [emailAddress, password], function (err, data, fields) {
//         if(err) throw err
//         if(data.length>0){
//             req.session.loggedinUser= true;
//             req.session.emailAddress= emailAddress;
//             res.redirect('/addCandidate');
//         }else{
//             res.render('admin_login.ejs',{alertMsg:"Your Email Address or password is wrong"});
//         }
//     })

// })

router.post('/adlogin',auth.validateLogin,catchLoginErrors,passport.authenticate('local',{
    successRedirect:"/addCandidate",
    failureRedirect:"/adlogin",
    successFlash:true,
    failureFlash:true
}))

module.exports = router;

