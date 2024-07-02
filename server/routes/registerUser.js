import bodyParser from 'body-parser'
import express from 'express'
import bcrypt from 'bcrypt'

import validateData from './validation/registerData.js'

const app = express()
app.use(bodyParser.json())

const registerUser = async (req, res, conn) => {
    try {
        const userData = req.body
        // console.log('Received data:', userData)
        // console.log('Password:', userData.password)

        const errors = validateData(userData)
        // console.log('errors:', errors.length, errors)
        if (errors.length > 0) {
            throw {
                errorMessage: 'Incomplete information',
                errors: errors
            }
        }

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
        res.status(201).json({ 
            message: 'User created successfully', 
            userId: results.insertId,
            data: results
        })
    } catch (error) {
        const message = error.message || 'something wrong'
        res.status(500).json({
            message: message,
            errors: error.errors || [] 
        })
    }
}

export default registerUser