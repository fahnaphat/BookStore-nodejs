axios.defaults.withCredentials = true
let sessionStu = ''
const getStudentId = async function() {
    await axios.get('http://localhost:8000')
        .then(res => {
            if(res.data.valid) {
                console.log(res.data.name)
                let user = res.data.name.split(":")
                if (user[0] === "2") {
                    sessionStu = user[1]
                    // document.getElementById('text').textContent = `Welcome ${user[2]} - You can Enroll course.`
                    document.getElementById('login-btn').style.display = 'none';
                    document.getElementById('logout-btn').style.display = 'inline-block';
                } else {
                    window.location.href = './index.html'
                }
            }
        })
        .catch(err => console.log(err.response))
    
    // console.log('student view:',sessionStu)
}

let courseById = []
const getStudentCourse = async function() {
    let myAllCourseId = []
    await axios.get('http://localhost:8000/course/enrollByuserId')
        .then(res => {
            // console.log("getStudentCourseId:",res.data)
            myAllCourseId = res.data
        })
        .catch(err => console.log(err.response))

    // console.log("showid:", myAllCourseId[0].subject_id)
    for(let i = 0; i < myAllCourseId.length; i++) {
        await axios.get(`http://localhost:8000/course/${myAllCourseId[i].subject_id}`)
        .then(res => {
            courseById.push(res.data)
        })
        .catch(err => console.log(err.response))
    }
    if (courseById.length > 0) {
        getAllCourse(courseById);
    }
    else {
        document.getElementById('mycourse-list').textContent = 'No enrolled courses found.'
    }

}

const getAllCourse = (courseById) => {
    let courseCard = document.getElementById('mycourse-list')
    let item = '<table>'
    item += '<tr>'
    item += '<th></th>'
    item += '<th>Subject Name</th>'
    item += '<th>About course</th>'
    item += '<th>Teacher</th>'
    item += '<th></th>'
    item += '</tr>'
    for(let i = 0; i < courseById.length; i++) {
        item += '<tr>'
        item += `<td>${i+1}</td>`
        item += `<td>${courseById[i][0].name}</td>`
        item += `<td>${courseById[i][0].category}</td>`
        item += `<td>${courseById[i][0].teacher}</td>`
        item += `<td><button id="cancelEnroll-${courseById[i][0].id}" onclick="EnrollCourse(${courseById[i][0].id})">cancel Enroll</button></td>`
        item += '</tr>'
    }
    item += '</table>'
    courseCard.innerHTML = item
}

async function EnrollCourse(courseId) {
    console.log(courseId)
    var modelDel = document.getElementById('confirmModal');
    var span = document.getElementsByClassName("close-del")[0];
    var cancelbtn = document.getElementById("cancelDelete");
    var yesbtn = document.getElementById("confirmDelete");
    modelDel.style.display = "block";
    span.onclick = function() {
        modelDel.style.display = "none";
    }
    cancelbtn.onclick = function() {
        modelDel.style.display = "none";
    }

    yesbtn.onclick = async function() {
        try {
            const response = await axios.delete(`http://localhost:8000/course/enroll/delete/${courseId}`)
    
            if (response.data.success) {
                alert(response.data.message)
                window.location.href = './studentCourse.html'
            }
        } catch (error) {
            // let errMsg = error.response.data.message
            console.log(error.response.data.message)
        }
    }
}

getStudentId();
getStudentCourse();

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