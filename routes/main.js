const express = require('express')
const passport = require('passport')
const mysql = require('mysql')
const dbConfig = require('../config/db_config')
const connection = mysql.createConnection(dbConfig)
const router = express.Router();

router.get('/', (req, res) => {
    if(req.user)
        res.render('main',{user:req.user})
    else
        res.render('main')
})

router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register',(req,res)=>{
    connection.query('INSERT INTO users (id, password, nickname) VALUES (?, MD5(?), ?)',[req.body.id, req.body.password, req.body.nickname],(err,results)=>{
        if(err)
            throw err
    })
    res.redirect('/')
})

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/' }))

module.exports = router