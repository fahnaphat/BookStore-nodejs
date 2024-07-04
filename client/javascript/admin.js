axios.defaults.withCredentials = true
let sessionName = ''
axios.get('http://localhost:8000')
    .then(res => {
        // console.log('Respone:',res)
        if (res.data.valid) {
            console.log(res.data.name)
            let user = res.data.name.split(":")
            if (user[0] === "1") {
                // window.location.href = './admin.html'
                sessionName = res.data.name
                document.getElementById('text').textContent = `Welcome ${user[2]}`
                document.getElementById('login-btn').style.display = 'none';
                document.getElementById('logout-btn').style.display = 'inline-block';
            } else {
                window.location.href = './index.html'
            }
        }
    })
    .catch(err => console.log(err))

/* list all courses */
axios.get('http://localhost:8000/course')
    .then(res => {
        let courseCard = document.getElementById('list-course')
        let item = ''
        if (res.data.length > 0) {
            console.log(res.data)
            item = '<div>'
            for (let i = 0; i < res.data.length; i++) {
                let subjectId = res.data[i].id;
                item += '<div>'
                item += `<h3>${res.data[i].name}</h3>`  
                item += `<p>About this course: ${res.data[i].category}</p>`
                item += `<p>Teacher: ${res.data[i].teacher}</p>`
                item += `<button id="edit-btn-${subjectId}" onclick="EditCourse(${subjectId})">Edit</button>`;
                item += `<button id="delete-btn-${subjectId}" onclick="DeleteCourse(${subjectId})">Delete</button>`;
                item += '</div>'
                item += `<hr/>`
            }
            item += '</div>'
            courseCard.innerHTML = item
        }
    })
    .catch(err => console.log(err))

function EditCourse(subjectId) {
    console.log(`Edit course with ID: ${subjectId}`);
    document.getElementById('create-btn').style.display = 'none';
    document.getElementById('edit-btn').style.display = 'inline-block';
    let id = subjectId
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var cancelbtn = document.getElementById("cancel-btn");
    var Editbtn = document.getElementById("edit-btn");

    /* fetching subject by id */
    axios.get(`http://localhost:8000/course/${subjectId}`)
        .then(res => {
            if (res.data.length > 0) {
                console.log(res.data)
                console.log(res.data[0].name)
                document.getElementById('cname').value = res.data[0].name || '';
                document.getElementById('category').value = res.data[0].category || '';
                document.getElementById('teacher').value = res.data[0].teacher || '';
                if (res.data[0].status === "active") {
                    document.getElementById('active').checked = true;
                } else {
                    document.getElementById('inactive').checked = true;
                }
            }
        })
        .catch(err => console.log(err))

    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
        window.location.href = './index.html'
    }
    cancelbtn.onclick = function() {
        modal.style.display = "none";
        window.location.href = './index.html'
    }

    /* call api for update subject by id */
    Editbtn.onclick = async function() {
        try {
            let updateSubject = {
                user_id: sessionName.split(":")[1],
                name: document.getElementById('cname').value,
                category: document.getElementById('category').value,
                teacher: document.getElementById('teacher').value,
                status: document.querySelector('input[name="status"]:checked').value
            }
            console.log(updateSubject)
            
            const response = await axios.put(
                `http://localhost:8000/course/edit/${subjectId}`, 
                updateSubject
            )
            console.log(response.data)
    
            if (response.data.success) {
                alert(response.data.message)
                window.location.href = './admin.html'
            }
        } catch (error) {
            let nameMsgErr = document.getElementById('error-cname')
            nameMsgErr.innerHTML = ''
            let categoryMsgErr = document.getElementById('error-category')
            categoryMsgErr.innerHTML = ''
            let teacherMsgErr = document.getElementById('error-teacher')
            teacherMsgErr.innerHTML = ''
            let errors = error.errors || []
            let errMsg = error.response.data.message
            // console.log(error.message)
            if (error.response && error.response.data) {
                console.log(errMsg)
                errors = error.response.data.errors
                // console.log("what res:", error.response.data.errors)
            }
            if (errors && errors.length > 0) {
                for (let i=0; i < errors.length; i++) {
                    let msgErr = errors[i].split(":")
                    if (msgErr[0] === "1") { nameMsgErr.innerHTML = msgErr[1] }
                    if (msgErr[0] === "2") { categoryMsgErr.innerHTML = msgErr[1] }
                    if (msgErr[0] === "3") { teacherMsgErr.innerHTML = msgErr[1] }
                }
            }
        }
    }

}

function DeleteCourse(subjectId) {
    console.log(`Delete course with ID: ${subjectId}`);
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

const createNewCourse = () => {
    document.getElementById('create-btn').style.display = 'inline-block';
    document.getElementById('edit-btn').style.display = 'none';
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var cancelbtn = document.getElementById("cancel-btn");
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
        window.location.href = './index.html'
    }
    cancelbtn.onclick = function() {
        modal.style.display = "none";
        window.location.href = './index.html'
    }
}

const submitCreate = async () => {
    try {
        let subjectData = {
            user_id: sessionName.split(":")[1],
            name: document.getElementById('cname').value,
            category: document.getElementById('category').value,
            teacher: document.getElementById('teacher').value,
            status: document.querySelector('input[name="status"]:checked').value
        }
        // console.log(subjectData)
        
        const response = await axios.post(
            'http://localhost:8000/course/create', 
            subjectData
        )
        // console.log(response.data)

        if (response.data.success) {
            alert(response.data.message)
            window.location.href = './admin.html'
        }

    } catch (error) {
        let nameMsgErr = document.getElementById('error-cname')
        nameMsgErr.innerHTML = ''
        let categoryMsgErr = document.getElementById('error-category')
        categoryMsgErr.innerHTML = ''
        let teacherMsgErr = document.getElementById('error-teacher')
        teacherMsgErr.innerHTML = ''
        let errors = error.errors || []
        if (error.response && error.response.data) {
            errors = error.response.data.errors
        }
        if (errors && errors.length > 0) {
            for (let i=0; i < errors.length; i++) {
                let msgErr = errors[i].split(":")
                if (msgErr[0] === "1") { nameMsgErr.innerHTML = msgErr[1] }
                if (msgErr[0] === "2") { categoryMsgErr.innerHTML = msgErr[1] }
                if (msgErr[0] === "3") { teacherMsgErr.innerHTML = msgErr[1] }
            }
        }

    }
}