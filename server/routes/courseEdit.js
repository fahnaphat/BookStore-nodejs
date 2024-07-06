import validateData from './validation/subjectData.js'

const courseEdit = async (req, res, conn) => {
    try {   
        const subjectId = parseInt(req.params.id)
        const subjectData = req.body
        const errors = validateData(subjectData)
        if(errors.length > 0) {
            // console.log(errors)
            throw {
                errorMessage: 'Incomplete information',
                errors: errors
            }
        }
        const data = {
            user_id: subjectData.user_id,
            name: subjectData.name,
            category: subjectData.category,
            teacher: subjectData.teacher,
            status: subjectData.status
        }
        const [results] = await conn.query('UPDATE Subjects SET ? WHERE id = ?', [data, subjectId])
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Subject not found' })
        }
        res.json({ message: 'Subject updated successfully', success: true, subjectId: subjectId })
    } catch (error) {
        // console.error('Error updating course:', error)
        // res.status(500).json({ error: 'Error updating course' })
        const errMessage = error.errorMessage || 'Something went wrong!'
        return res.status(500).json({
            message: errMessage,
            errors: error.errors || []
        })
    }
}

export default courseEdit