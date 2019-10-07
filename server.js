const express = require('express')
const app = express()

const port = 9562

app.set('view engine','pug')
app.set('views','views')

app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})