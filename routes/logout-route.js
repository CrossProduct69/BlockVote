const express = require('express');
const router = express.Router();
/* GET users listing. */
router.get('/logout', function(req, res) {
  req.logOut(function(err) 
  {
    res.redirect('/');
  });
  
});
module.exports = router;