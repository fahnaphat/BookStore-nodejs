const courseInfoEnroll = async (req, res, conn) => {
    const subjectId = parseInt(req.params.id);
    try {
        const [rows] = await conn.execute(
            `SELECT 
                Users.firstname,
                Users.lastname,
                Users.email,
                Subjects.name AS subject_name,
                Subjects.category,
                Subjects.teacher,
                Subjects.status
             FROM Enroll
             JOIN Users ON Enroll.user_id = Users.id
             JOIN Subjects ON Enroll.subject_id = Subjects.id
             WHERE Enroll.subject_id = ?`, 
            [subjectId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No courses found for the given user.' });
        }

        res.json(rows);
    } catch (error) {
        console.error('Error fetching course enrollments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default courseInfoEnroll