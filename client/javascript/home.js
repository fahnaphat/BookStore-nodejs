axios.defaults.withCredentials = true
let sessionStu = ''
axios.get('http://localhost:8000')
    .then(res => {
        if(res.data.valid) {
            console.log(res.data.name)
            let user = res.data.name.split(":")
            if (user[0] === "2") {
                sessionStu = user[1]
                document.getElementById('text').textContent = `Welcome ${user[2]} - You can Enroll course.`
                document.getElementById('login-btn').style.display = 'none';
                document.getElementById('logout-btn').style.display = 'inline-block';
            } else {
                window.location.href = './index.html'
            }
        }
    })
    .catch(err => console.log(err.response))

const logout = () => {
    axios.post('http://localhost:8000/logout')
        .then(res => {
            // console.log(res)
            if (res.status === 200) {
                window.location.href = './index.html';
            }
        })
        .catch(err => console.log(err.response));
}

let enrolled_subjectId = []
axios.get('http://localhost:8000/course/enrollByuserId')
    .then(res => {
        if(res.data) {
            if (res.data.length > 0) {
                for (let i = 0; i < res.data.length; i++) {
                    enrolled_subjectId.push(res.data[i].subject_id)
                }
            }
        }
        // console.log('enroll array:',enrolled_subjectId)
    })
    .catch(err => console.log(err.response))


/* list all courses */
axios.get('http://localhost:8000/course')
    .then(res => {
        let courseCard = document.getElementById('list-course')
        let item = ''
        if (res.data.length > 0) {
            // console.log(res.data)
            for (let i = 0; i < res.data.length; i++) {
                item += '<div class="course-card">'
                let subjectId = res.data[i].id;
                item += '<div class="content">'
                item += `<h3>${res.data[i].name}</h3>`  
                item += `<p>About this course: ${res.data[i].category}</p>`
                item += `<p>Teacher: ${res.data[i].teacher}</p>`
                if (enrolled_subjectId.includes(subjectId)) {
                    item += `<button type="button" class="enroll-btn" disabled>This course is enrolled</button>`;
                } else {
                    item += `<button id="enroll-btn-${subjectId}" class="enroll-btn" onclick="EnrollCourse(${subjectId})">Enroll</button>`;

                }
                item += '</div>'
                item += '</div>'
            }
            courseCard.innerHTML = item
        }
    })
    .catch(err => console.log(err.response))

async function EnrollCourse(subjectId) {
    console.log('Enroll course:', subjectId, sessionStu)
    let data = {
        user_id: sessionStu,
        subject_id: subjectId
    }
    try {
        const response = await axios.post('http://localhost:8000/course/enroll', data);
        console.log("res:", response.data)
        if (response.data.success) {
            alert(response.data.message);
            document.getElementById(`enroll-btn-${subjectId}`).disabled = true; // Disable the button
            document.getElementById(`enroll-btn-${subjectId}`).textContent = 'Enrolled'
            window.location.href = './home.html'
        }
    } catch (error) {
        console.error('Error enrolling course:', error);
    }
}