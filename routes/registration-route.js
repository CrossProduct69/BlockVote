const validator = require('express-validator')
const auth = require('../validation/authValidation');
const registerService = require('../service/registerService')

var express = require('express');
var router = express.Router();
var db=require('../database');
var app = express();
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))


// to display registration form 
router.get('/register', function(req, res, next) {
  res.render('registration-form.ejs');
});


// to store user input detail on post request
router.post('/register',auth.validateRegister,async function(req, res) {
    
    // inputData ={
    //     first_name: req.body.first_name,
    //     email_address: req.body.email_address,
    //     password: req.body.password,
    //     confirm_password:req.body.confirm_password
    // }
    

    let errorsArr=[];
    let validationErrors = validator.validationResult(req)
    if(!validationErrors.isEmpty()){
      let errors = Object.values(validationErrors.mapped())
      errors.forEach((item)=>{
        errorsArr.push(item.msg)
      })
      req.flash("error",errorsArr);
      return res.redirect('/register')
    }
    let newUser = {
        first_name: req.body.first_name,
        email_address: req.body.email_address,
        password: req.body.password
    }
    try{
        await registerService.createNewUser(newUser);
        req.flash("success","You are successfully registered");
        return res.redirect("/login");
    }catch(e){
      req.flash("error",e)
      return res.redirect('/register')
    }
// check unique email address
// var sql='SELECT * FROM registration WHERE email_address =?';
// db.query(sql, [inputData.email_address],function (err, data, fields) {
//  if(err) throw err
//  if(data.length>0){
//     var msg = inputData.email_address+ "already exists";
//  }else if(inputData.confirm_password != inputData.password){
//     var msg ="Password & Confirm Password is not Matched";
//  }else{
     
//     // save users data into database
//     var sql = 'INSERT INTO registration SET ?';
//     console.log(sql);
//     db.query(sql, inputData, function (err, data) {
//       if (err) throw err;
//            });
//     var msg ="Your are successfully registered";
// }
// res.render('registration-form.ejs',{alertMsg:msg});
// })
     
});
module.exports = router;

