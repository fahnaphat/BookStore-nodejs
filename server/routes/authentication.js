import bodyParser from 'body-parser'
import express from 'express'
import bcrypt from 'bcrypt'

const app = express()
app.use(bodyParser.json())

const authenUser = async (req, res, conn) => {
    try {
        const data = req.body
        // console.log('Data:', data.email, data.password)

        // Check if the email exists in the Users table
        const [results] = await conn.query('SELECT * FROM Users WHERE email = ?', [data.email])
        if (results.length === 0) return res.status(401).json({ message: 'Email or password is incorrect.' });

        // Check if the provided password matches the hashed password in the database
        const user = results[0];
        const isPasswordMatch = await bcrypt.compare(data.password, user.password);
        if (!isPasswordMatch) return res.status(401).json({ message: 'Email or password is incorrect.' });
        
        req.session.name = user.role_id.toString() + ':' + user.id.toString() + ':' + user.firstname
        // console.log('Session:', req.session.name)

        // If email and password are correct, respond with 200
        return res.status(200).json({
            message: 'Login Successfully',
            success: true,
            data: user
            // sessionname: req.session.name
        });

    } catch (error) {
        console.error(error)
        const errMessage = error.message || 'Something went wrong'
        return res.status(500).json({
            message: errMessage,
            errors: error.errors || []
        })
    }
}

export default authenUser