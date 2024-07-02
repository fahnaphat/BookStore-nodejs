const submitLogin = async (event) => {
    event.preventDefault();
    let emailDom = document.getElementById('email').value
    let passwordDom = document.getElementById('password').value
    let inputInvalid = document.getElementById('error-inputInvalid')
    inputInvalid.innerHTML = ''

    if (!emailDom) {
        document.getElementById('error-email').innerHTML = 'Email is require'
        return;
    } else { document.getElementById('error-email').innerHTML = '' }

    if (!passwordDom) {
        document.getElementById('error-password').innerHTML = 'Password is require'
        return;
    } else { document.getElementById('error-password').innerHTML = '' }

    try {
        let userData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }
        // console.log("userData:", userData)

        const response = await axios.post(
            'http://localhost:8000/authen',
            userData
        )
        alert(response.data.message)
        window.location.href = './index.html'
    } catch (error) {
        let errors = error.errors || []
        let errorMessage = error.message

        if (error.response && error.response.data) {
            errors = error.response.data.errors
            errorMessage = error.response.data.message
            inputInvalid.innerHTML = errorMessage
            console.log('Error message:',errorMessage)
        }
    }
}
