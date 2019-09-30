const express = require('express')
const app = express()

const port = 9562

app.get('/',(req,res)=>{
    res.send('Hello World! Weeeeeeeeeeeeeeee')
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})