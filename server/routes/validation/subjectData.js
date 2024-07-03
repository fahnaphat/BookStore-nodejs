const validateSubjectData = (courseData) => {
    let errors = []
    if (!courseData.name) { errors.push('1:Course Name is require') }
    if (!courseData.category) { errors.push('2:Category is require') }
    if (!courseData.teacher) { errors.push('3:Teacher is require') }
    return errors
}

export default validateSubjectData