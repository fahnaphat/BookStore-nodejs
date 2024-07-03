axios.defaults.withCredentials = true
axios.get('http://localhost:8000')
    .then(res => {
        if(res.data.valid) {
            console.log(res.data.name)
            let user = res.data.name.split(":")
            if (user[0] === "2") {
                document.getElementById('text').textContent = `Welcome ${user[2]} - You can Enroll course.`
                document.getElementById('login-btn').style.display = 'none';
                document.getElementById('logout-btn').style.display = 'inline-block';
            } else {
                window.location.href = './index.html'
            }
        }
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