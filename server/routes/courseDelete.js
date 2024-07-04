const courseDelete = async (req, res, conn) => {
    try {
        const subjectId = parseInt(req.params.id);
        
        // Perform the delete operation
        const [results] = await conn.query('DELETE FROM Subjects WHERE id = ?', [subjectId]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        res.json({ message: 'Subject deleted successfully', success: true });
    } catch (error) {
        console.error('Error deleting course:', error);
        const errMessage = error.errorMessage || 'Something went wrong!';
        return res.status(500).json({
            message: errMessage
        });
    }

}

export default courseDelete