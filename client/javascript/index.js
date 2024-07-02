/* get api for session value */
axios.defaults.withCredentials = true

axios.get('http://localhost:8000')
    .then(res => {
        // console.log('Respone:',res)
        if (res.data.valid) {
            console.log(res.data.name)
            document.getElementById('sayhi').textContent = `Welcome to the Bookstore ${res.data.name}`
            document.getElementById('login-btn').style.display = 'none';
            document.getElementById('logout-btn').style.display = 'inline-block';
            // document.getElementById('login-out-btn').textContent = 'logout'
        }
        else {
            window.location.href = './login.html'
        }
    })
    .catch(err => console.log(err))

const logout = () => {
    axios.post('http://localhost:8000/logout')
        .then(res => {
            if (res.status === 200) {
                window.location.href = './login.html';
            }
        })
        .catch(err => console.log(err));
}   