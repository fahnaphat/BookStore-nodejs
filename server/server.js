import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import bodyParser from 'body-parser'

import registerUser from './routes/registerUser.js'

const app = express()
app.use(bodyParser.json())
app.use(cors())

let conn = null
const connectMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'phpmyadmin',
        password: 'fahnaphat',
        database: 'bookstore'
    })
}

const setupRoutes = (app, conn) => {
    app.post('/register/users', (req, res) => registerUser(req, res, conn))
}

app.listen(8000, async () => {
    await connectMySQL()
    setupRoutes(app, conn)
    console.log('Server started on port 8000')
})