const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    if(req.user)
        res.render('main',{user:req.user})
    else
        res.render('main')
})

module.exports = router