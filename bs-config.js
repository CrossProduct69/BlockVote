const express = require('express');
const flash = require('connect-flash')
const ejs = require("ejs");
const cookieParser = require('cookie-parser')
const passport = require('passport')
const session = require('express-session');
const bodyParser = require('body-parser'); 
const {isLoggedIn,isAdminLoggedIn} = require("./middleware")
const path = require('path');

const app = express();
require('./controller/passportLocalController')(passport)

const registrationRouter = require('./routes/registration-route');
const loginRouter = require('./routes/login-route');
const dashboardRouter = require('./routes/dashboard-route');
const logoutRouter = require('./routes/logout-route');
const RegisterRouter = require('./routes/main');
const AdminLogin = require('./routes/admin_login');
const Tableview =  require('./routes/table_view');

app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');
app.use(express.static('src'));
app.use(cookieParser("secret"))



app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000*300 }
})) 


app.use(flash())
app.use(passport.initialize());
app.use(passport.session());


app.use((req,res,next)=>{
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    res.locals.currentUser = req.user
    next()
})

app.use('/',registrationRouter);
app.use('/', loginRouter);
app.use('/', dashboardRouter);
app.use('/', logoutRouter);
app.use('/',RegisterRouter);
app.use('/',AdminLogin);
app.use('/',Tableview);



app.get('/vote_area',isLoggedIn, function (req, res) {
   res.sendFile( __dirname  + "/src/vote_area.html" );
})

app.get('/candidateDetails',isAdminLoggedIn,function (req, res) {
  res.sendFile( __dirname  + "/src/adminCandidateDetails.html" );
})

app.get('/userInfo', isLoggedIn ,function (req, res) {
  res.sendFile( __dirname  + "/src/userInfo.html" );
})

app.get('/result', isLoggedIn,function (req, res) {
  res.sendFile( __dirname  + "/src/result.html" );
})

app.get('/addCandidate',isAdminLoggedIn,function (req, res) {
  res.sendFile( __dirname  + "/src/adminAddCandidate.html" );
})

app.get('/changePhase', isAdminLoggedIn,function (req, res) {
  res.sendFile( __dirname  + "/src/adminChangePhase.html" );
})

// app.get('/voting', isLoggedIn,function (req, res) {
//   res.sendFile( __dirname  + "/src/voting.html" );
// })


app.get('/hello', function (req, res) {
   res.send('hello');
})


// app.listen(3000,()=>{
//   console.log("Server listening on Port", 3000);
// })


module.exports = {
  "server": {
    "baseDir": ["./src", "./build/contracts"],
    "routes": {
      "/node_modules": "node_modules"
    },
    middleware: {
      1: app,
  },
},
port:3000,
}