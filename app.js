const express = require('express')
const app = express()

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

// 테스트용 유저 정보 ㅇㅇ
let userData = {
    username: "admin",
    password: "admin1234",
    id: 1234
}

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    console.log('deserialize : ', id)
    done(null, userData)
})

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log("localStrategy : " + username, password)
        if (username === userData.username) {
            if (password === userData.password) {
                return done(null, userData)
            } else {
                return done(null, false, { message: 'Incorrect password.' })
            }
        } else {
            return done(null, false, { message: "Incorrect username." })
        }
    }
));

// 뷰 세팅 (pug)
app.set('view engine', 'pug')
app.set('views', 'views')

// 라우터
app.use('/', mainRouter)

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/' }))

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})