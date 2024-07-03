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

const createNewCourse = () => {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var closebtn = document.getElementById("close-btn");
    // console.log('open window')
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    }
    closebtn.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // }
}

const submitCreate = async () => {
    // console.log('submit creating ...')
    let nameMsgErr = document.getElementById('error-cname')
    nameMsgErr.innerHTML = ''
    let categoryMsgErr = document.getElementById('error-category')
    categoryMsgErr.innerHTML = ''
    let teacherMsgErr = document.getElementById('error-teacher')
    teacherMsgErr.innerHTML = ''

    try {
        const userId = await axios.get('http://localhost:8000')
            .then(res => {
                if (res.data.valid) { 
                    return res.data.name; 
                }
            })
            .catch(err => console.log(err))
        
        let subjectData = {
            user_id: userId.split(":")[1],
            name: document.getElementById('cname').value,
            category: document.getElementById('category').value,
            teacher: document.getElementById('teacher').value
        }
        console.log(subjectData)
        
        const response = await axios.post(
            'http://localhost:8000/create/course', 
            subjectData
        )
        console.log(response.data)

        if (response.data.success) {
            alert(response.data.message)
            window.location.href = './admin.html'
        }

    } catch (error) {
        let errors = error.errors || []
        // console.log(error.message)
        if (error.response && error.response.data) {
            errors = error.response.data.errors
            console.log("what res:", error.response.data.errors)
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