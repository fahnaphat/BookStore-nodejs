const courseEnrollDelete = async (req, res, conn) => {
    try {
        const userId = req.session.name.split(":")[1];
        const subjectId = parseInt(req.params.id);

        const [results] = await conn.query('DELETE FROM Enroll WHERE user_id = ? AND subject_id = ?', [userId, subjectId]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        res.json({ message: 'Cancel the enroll course successfully', success: true });

    } catch (error) {
        console.error('Error cancel the enroll course:', error);
        const errMessage = error.errorMessage || 'Something went wrong!';
        return res.status(500).json({
            message: errMessage
        });
    }
}

export default courseEnrollDelete