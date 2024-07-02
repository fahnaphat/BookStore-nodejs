import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import bodyParser from 'body-parser'
import session from 'express-session'
import cookieParser from 'cookie-parser'

import registerUser from './routes/registerUser.js'
import authenUser from './routes/authentication.js'

const app = express()
app.use(bodyParser.json())
app.use(cors({
    origin: ["http://127.0.0.1:5500"],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))

app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,   // can use with HTTP
        maxAge: 1000 * 60 * 60 * 24 // Expiration time 1 day
    }
}))

let conn = null
const connectMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'phpmyadmin',
        password: 'fahnaphat',
        database: 'bookstore'
    })
}

/* api session start */
app.get('/', (req, res) => {
    if (req.session.name) {
        return res.json({ valid: true, name: req.session.name })
    } else {
        return res.json({ valid: false })
    }
})

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) { return res.status(500).json({ message: 'Logout failed' }) };
        res.clearCookie('connect.sid')
        // console.log(res)
        return res.status(200).json({ message: 'Logout successful' })
    })
})

const setupRoutes = (app, conn) => {
    app.post('/register', (req, res) => registerUser(req, res, conn))
    app.post('/authen', (req, res) => authenUser(req, res, conn))
}

app.listen(8000, async () => {
    await connectMySQL()
    setupRoutes(app, conn)
    console.log('Server started on port 8000')
})