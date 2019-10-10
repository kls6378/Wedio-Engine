const express = require('express')
const app = express()

const port = 9562

// Get Router
const mainRouter = require('./routes/main')

// View Setting (pug)
app.set('view engine', 'pug')
app.set('views', 'views')

// Router
app.use('/', mainRouter)

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})