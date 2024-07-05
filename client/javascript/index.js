/* get api for session value */
axios.defaults.withCredentials = true

axios.get('http://localhost:8000')
    .then(res => {
        // console.log('Respone:',res)
        if (res.data.valid) {
            // console.log(res.data.name)
            let role = res.data.name.split(":")[0]
            if (role === "1") {
                window.location.href = './admin.html'
            } else if (role === "2") {
                window.location.href = './home.html'
            }
        }
        else {
            // window.location.href = './index.html'
            displayListCourses();
        }
    })
    .catch(err => console.log(err))

const displayListCourses = async () => {
    /* list all courses */
    await axios.get('http://localhost:8000/course')
        .then(res => {
            let courseCard = document.getElementById('list-course')
            let item = ''
            if (res.data.length > 0) {
                // console.log(res.data)
                item = '<div>'
                for (let i = 0; i < res.data.length; i++) {
                    let subjectId = res.data[i].id;
                    item += '<div>'
                    item += `<h3>${res.data[i].name}</h3>`  
                    item += `<p>About this course: ${res.data[i].category}</p>`
                    item += `<p>Teacher: ${res.data[i].teacher}</p>`
                    item += '</div>'
                    item += `<hr/>`
                }
                item += '</div>'
                courseCard.innerHTML = item
            }
        })
        .catch(err => console.log(err.response))
}

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