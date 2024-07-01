const validateData = (userData) => {
    let errors = []
    if (!userData.firstname) { errors.push('1:Firstname is require') }
    if (!userData.lastname) { errors.push('2:Lastname is require') }
    if (!userData.email) { errors.push('3:Email is require') }
    if (!userData.password) { errors.push('4:Password is require') }
    return errors
}

export default validateData