const courseEnroll = async (req, res, conn) => {
    try {
        const enrollInfo = req.body
        let data = {
            user_id: enrollInfo.user_id,
            subject_id: enrollInfo.subject_id
        }
        // console.log('data', data)

        await conn.query('INSERT INTO Enroll SET ?', [data])
        res.status(201).json({ 
            message: 'Course enrolled successfully',
            success: true
        })
    } catch (error) {
        console.error('Error enroll for course', error);
        const errMessage = error.errorMessage || 'Something went wrong!';
        return res.status(500).json({
            message: errMessage
        });
    }
}

export default courseEnroll