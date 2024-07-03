axios.defaults.withCredentials = true
axios.get('http://localhost:8000')
    .then(res => {
        // console.log('Respone:',res)
        if (res.data.valid) {
            console.log(res.data.name)
            window.location.href = './index.html'
        }
        // else {
        //     window.location.href = './index.html'
        // }
    })
    .catch(err => console.log(err))

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
        console.log(response.data)
        if (response.data.success) { 
            alert(response.data.message)
            window.location.href = './index.html'
        }

    } catch (error) {
        // let errors = error.errors || []
        // let errorMessage = error.message
        if (error.response) {
            if (error.response.status === 401) {
                console.log(error.message)
                inputInvalid.innerHTML = error.response.data.message
            } else {
                console.log(error.message)
                // navigate to error page (Internal server error)
            }
        }
    }
}
