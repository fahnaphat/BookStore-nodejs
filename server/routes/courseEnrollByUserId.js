const courseEnrollByUserId = async (req, res, conn) => {
    try {
        if (req.session.name) {
            const userId = req.session.name.split(":")[1]
            const [results] = await conn.query('SELECT * FROM Enroll WHERE user_id = ?', userId)
            // console.log('data:', results)
            res.json(results)
        }
    } catch (error) {
        console.error('Error fetching course enrolled by id', error.message)
        res.status(500).json({ error: 'Error fetching course enrolled by id' })
    }
}

export default courseEnrollByUserId