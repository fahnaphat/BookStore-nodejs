axios.defaults.withCredentials = true

let sessionStu = '';
const getAdminId = async function() {
    await axios.get('http://localhost:8000')
        .then(res => {
            if(res.data.valid) {
                console.log(res.data.name)
                let user = res.data.name.split(":")
                if (user[0] === "1") {
                    sessionStu = user[1]
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

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Example usage to get the sid parameter
document.addEventListener("DOMContentLoaded", function() {
    var subjectId = getParameterByName('sid');
    
    const getCourseEnrolled = async function(subjectId) {
        console.log('Subject ID:', subjectId);
        await axios.get(`http://localhost:8000/course/enroll/info/${subjectId}`)
        .then(res => {
            // console.log(res.data)
            showCourseInfo(res.data)
        })
        .catch(err => {
            if (err.response.status === 404) {
                getCourseById(subjectId);
            }
            else {
                console.log(err.response.data)
            }
        })
    }

    const getCourseById = async function(subjectId) {
        await axios.get(`http://localhost:8000/course/${subjectId}`)
        .then(res => {
            // console.log(res.data)
            showCourseInfoNotEnroll(res.data)
        })
        .catch(err => console.log(err.response.data))
    }

    getCourseEnrolled(subjectId);
});

const showCourseInfo = function(courseInfo) {
    console.log(courseInfo)
    let courseCard = document.getElementById('course-info')
    let item = '<div>'
    item += `<h3>Course: ${courseInfo[0].subject_name}</h3>`  
    item += `<p>About this course: ${courseInfo[0].category}</p>`
    item += `<p>Teacher: ${courseInfo[0].teacher}</p>`
    if (courseInfo[0].status === 'active') {
        item += `<p>Status: Open</p>`
    } else {
        item += `<p>Status: Close</p>`
    }
    item += '<hr/>'
    item += '</div>'
    courseCard.innerHTML = item

    let regTable = document.getElementById('enroll-table')
    let student = '<table>'
    student += '<tr>'
    student += '<th></th>'
    student += '<th>First Name</th>'
    student += '<th>Last Name</th>'
    student += '<th>Email</th>'
    student += '</tr>'
    for (let i = 0; i < courseInfo.length; i++) {
        student += '<tr>'
        student += `<td>${i+1}</td>`
        student += `<td>${courseInfo[i].firstname}</td>`
        student += `<td>${courseInfo[i].lastname}</td>`
        student += `<td>${courseInfo[i].email}</td>`
        student += '</tr>'
    }
    student += '</table>'
    regTable.innerHTML = student
}


const showCourseInfoNotEnroll = function(courseInfo) {
    console.log(courseInfo)
    let courseCard = document.getElementById('course-info')
    let item = '<div>'
    item += `<h3>Course: ${courseInfo[0].name}</h3>`  
    item += `<p>About this course: ${courseInfo[0].category}</p>`
    item += `<p>Teacher: ${courseInfo[0].teacher}</p>`
    if (courseInfo[0].status === 'active') {
        item += `<p>Status: Open</p>`
    } else {
        item += `<p>Status: Close</p>`
    }
    item += '<hr/>'
    item += '</div>'
    courseCard.innerHTML = item
    document.getElementById('enroll-table').textContent = 'No course registrants found.'
} 