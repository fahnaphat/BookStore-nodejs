axios.defaults.withCredentials = true
axios.get('http://localhost:8000')
    .then(res => {
        // console.log('Respone:',res)
        if (res.data.valid) {
            console.log(res.data.name)
            let user = res.data.name.split(":")
            if (user[0] === "1") {
                // window.location.href = './admin.html'
                document.getElementById('text').textContent = `Welcome ${user[2]}`
                document.getElementById('login-btn').style.display = 'none';
                document.getElementById('logout-btn').style.display = 'inline-block';
            } else {
                window.location.href = './index.html'
            }
        }
        // else {
        //     window.location.href = './login.html'
        // }
    })
    .catch(err => console.log(err))

    
const logout = () => {
    axios.post('http://localhost:8000/logout')
        .then(res => {
            // console.log(res)
            if (res.status === 200) {
                window.location.href = './index.html';
            }
        })
        .catch(err => console.log(err));
} 