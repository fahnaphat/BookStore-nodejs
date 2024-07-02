const validateData = (userData) => {
    let errors = []
    if (!userData.firstname) { errors.push('1:Firstname is require') }
    if (!userData.lastname) { errors.push('2:Lastname is require') }
    if (!userData.email) { 
        errors.push('3:Email is require') 
    } else if (userData.email) {
        let mail = userData.email.split("@")[1]
        if (mail.split(".")[0] === "admin") { errors.push('5:You cannot register with Admin email') }
    }
    if (!userData.password) { errors.push('4:Password is require') }
    return errors
}

export default validateData