document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const submitData = async () => {
        let userData = {
            role_id: 2,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }

        // console.log(userData)

        try {
            const response = await axios.post(
                'http://localhost:8000/users',
                userData
            )
            // console.log('response data', response.userData)
        } catch (error) {
            console.error(error)
        }
    }

    submitData()
});
