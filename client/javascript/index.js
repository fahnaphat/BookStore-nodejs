/* get api for session value */
axios.defaults.withCredentials = true

axios.get('http://localhost:8000')
    .then(res => {
        // console.log('Respone:',res)
        if (res.data.valid) {
            console.log(res.data.name)
            let role = res.data.name.split(":")[0]
            if (role === "1") {
                window.location.href = './admin.html'
            } else if (role === "2") {
                window.location.href = './home.html'
            }
        }
        // else {
        //     window.location.href = './index.html'
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