const courseById = async (req, res, conn) => {
    try {
        const subjectId = parseInt(req.params.id)
        const [results] = await conn.query('SELECT * FROM Subjects WHERE id = ?', subjectId)
        // console.log('data:', results)
        res.json(results)
    } catch (error) {
        console.error('Error fetching subject by id', error.message)
        res.status(500).json({ error: 'Error fetching subject by id' })
    }
}

export default courseById