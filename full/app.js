const express = require('express')
const app = express()

const mysql = require('mysql')
const dbConfig = require('./config/db_config')
const connection = mysql.createConnection(dbConfig)

const MD5 = require('md5')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')


const mainRouter = require('./routes/main')

const port = 9562

// 미들웨어
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())

// 패스포트

passport.serializeUser((user, done) => {
    console.log('serialize : ', user)
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    console.log('deserialize : ', id)
    connection.query('SELECT * FROM users WHERE id=?', [id], (err, results) => {
        let user = results[0]
        console.log('deserialize in mysql : ', user)
        done(null, user)
    })
})

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log("localStrategy : " + username, password)

        connection.query('SELECT * FROM users WHERE id=?', [username], (err, results) => {
            if (err)
                return done(err)
            if (results[0]) {
                if (results[0].password == MD5(password)) {
                    let user = results[0]
                    return done(null, user)
                } else {
                    return done(null, false, { message: '비밀번호를 확인해주세요.' })
                }
            } else {
                return done(null, false, { message: '아이디를 확인해주세요.' })
            }
        })
    }
));

// 뷰 세팅 (pug)
app.set('view engine', 'pug')
app.set('views', 'views')

// 라우터
app.use('/', mainRouter)

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})