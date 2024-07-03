import express from 'express'
import bodyParser from 'body-parser'

import validateData from './validation/subjectData.js'

const app = express()
app.use(bodyParser.json())

const courseCreate = async (req, res, conn) => {
    try {
        const courseData = req.body

        const errors = validateData(courseData)
        if(errors.length > 0) {
            console.log(errors)
            throw {
                errorMessage: 'Incomplete information',
                errors: errors
            }
        }

        const data = {
            user_id: courseData.user_id,
            name: courseData.name,
            category: courseData.category,
            teacher: courseData.teacher,
        }

        const [results] = await conn.query('INSERT INTO Subjects SET ?', data)
        res.status(201).json({ 
            message: 'Course created successfully',
            success: true,
            // data: results
        })

    } catch (error) {
        const errMessage = error.message || 'Something went wrong'
        return res.status(500).json({
            message: errMessage,
            errors: error.errors || []
        })
    }
}

export default courseCreate