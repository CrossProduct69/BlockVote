const validator = require('express-validator')

module.exports.isLoggedIn = (req,res,next)=>{
    //consolelog("REQ.USER...", req.user)//this also comes from passport stores the information(not sensitive information) of current user logged in
    if(!req.isAuthenticated()){
        //if not logged in then store the url the user was requesting and next time the user log in then redirect to the stored algorithm
        // console.log(req.path,req.originalUrl)
        req.flash('error','You must be signed in')
        return res.redirect('/login')
    }
    next();
}

module.exports.isAdminLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated() && req.user.email_address==='admin@admin.com'){
        next();
    }else{
        req.flash('error','You must be admin')
        return res.redirect('/adlogin')
    }
}



module.exports.catchLoginErrors = (req,res,next)=>{
    let errorsArr=[];
    let validationErrors = validator.validationResult(req)
    if(!validationErrors.isEmpty()){
      let errors = Object.values(validationErrors.mapped())
      errors.forEach((item)=>{
        errorsArr.push(item.msg)
      })
      req.flash("error",errorsArr);
      return res.redirect('/login')
    }
    next();
}