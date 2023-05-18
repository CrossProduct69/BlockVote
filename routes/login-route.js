const express = require('express');
const passport = require('passport')
const {catchLoginErrors} = require('../middleware')
const auth = require('../validation/authValidation')
const db=require('../database');


const app = express();
const router = express.Router();


app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login-form.ejs');
});

// router.post('/login', function(req, res){
//     var emailAddress = req.body.email_address;
//     var password = req.body.password;

//     var sql='SELECT * FROM registration WHERE email_address =? AND password =?';
//     db.query(sql, [emailAddress, password], function (err, data, fields) {
//         if(err) throw err
//         if(data.length>0){
//             req.session.loggedinUser= true;
//             req.session.emailAddress= emailAddress;
//             res.redirect('/userInfo');
//             // res.redirect('/blockchain');
//         }else{
//             res.render('login-form.ejs',{alertMsg:"Your Email Address or password is wrong"});
//         }
//     })

// })

router.post('/login',auth.validateLogin,catchLoginErrors,passport.authenticate('local',{
    successRedirect:"/userInfo",
    failureRedirect:"/login",
    successFlash:true,
    failureFlash:true
}))

module.exports = router;

