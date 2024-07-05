import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import bodyParser from 'body-parser'
import session from 'express-session'
import cookieParser from 'cookie-parser'

import registerUser from './routes/registerUser.js'
import authenUser from './routes/authentication.js'
import courseCreate from './routes/courseCreate.js'
import courseList from './routes/courseList.js'
import courseEdit from './routes/courseEdit.js'
import courseById from './routes/courseById.js'
import courseDelete from './routes/courseDelete.js'
import courseEnroll from './routes/courseEnroll.js'
import courseEnrollByUserId from './routes/courseEnrollByUserId.js'
import courseEnrollDelete from './routes/courseEnrollDelete.js'

const app = express()
app.use(bodyParser.json())
app.use(cors({
    origin: ["http://127.0.0.1:5500"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
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
        database: 'coursesweb'
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

/* api clear session */
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
    app.get('/course/enrollByuserId', (req, res) => courseEnrollByUserId(req, res, conn))
    app.get('/course', (req, res) => courseList(req, res, conn))
    app.post('/course/create', (req, res) => courseCreate(req, res, conn))
    app.put('/course/edit/:id', (req, res) => courseEdit(req, res, conn))
    app.get('/course/:id', (req, res) => courseById(req, res, conn))
    app.delete('/course/delete/:id', (req, res) => courseDelete(req, res, conn))
    app.post('/course/enroll', (req, res) => courseEnroll(req, res, conn))
    app.delete('/course/enroll/delete/:id', (req, res) => courseEnrollDelete(req, res, conn))
}

app.listen(8000, async () => {
    await connectMySQL()
    setupRoutes(app, conn)
    console.log('Server started on port 8000')
})