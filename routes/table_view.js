const express = require('express');
const db=require('../database');
const {isAdminLoggedIn} = require('../middleware')


const router = express.Router();

// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/table_view',isAdminLoggedIn,function(req, res, next) {
    var sql='SELECT * FROM registered_users';
    db.query(sql, (err, data, fields) =>{
    if (err) 
    {
        console.log(err)
        throw err;
    }
    res.render('adminVoterReg', { title: 'Registered Users List', userData: data});

  });
});
module.exports = router;