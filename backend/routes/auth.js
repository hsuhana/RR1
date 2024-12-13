const express = require('express');

const router = express.Router();

router.get('/check', (req, res) =>{
    console.log('User:', req.user); 
    if(req.isAuthenticated()){
        return res.json({ isAuthenticated: true, user: req.user });
    }else{
        return res.json({ isAuthenticated: false });
    }
    
});

module.exports = router;