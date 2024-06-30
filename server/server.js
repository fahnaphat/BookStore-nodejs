const express = require('express')
const app = express()
const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const cors = require('cors')

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

app.post('/users', async (req, res) => {
    const userData = req.body
    // console.log('Received data:', userData)
    // console.log('Password:', userData.password)

    try {
        const saltRounds = 10;
        const hashedPwd = await bcrypt.hash(userData.password, saltRounds);
        // console.log('Hashed password:', hashedPwd);

        const data = {
            role_id: userData.role_id,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            password: hashedPwd
        }

        const [results] = await conn.query('INSERT INTO Users SET ?', data)
        res.status(201).json({ message: 'User created successfully', userId: results.insertId })
    } catch (error) {
        console.error('Error creating user', error.message)
        res.status(500).json({ error: 'Error creating user' })
    }
})

app.listen(8000, async () => {
    //call function connectMySQL when starting server
    await connectMySQL()
    console.log('Server started on port 8000')
})