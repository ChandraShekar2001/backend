const signUp = document.querySelector('.sign-up')
// const login = document.querySelector('.login')
// const emailError = document.querySelector('.email-err')
// const passwordError = document.querySelector('.pwd-err')
// const myForm = document.querySelector('#myForm')
// const googleLogin = document.querySelector('.google')

signUp.addEventListener('click', (e) => {
    window.location.href = 'http://localhost:4000/api/v1/signup'
})

// async function captureData(){
//     const url = 'http://localhost:8000/register'
//     const response = await fetch(url)
//     const data = await response.json()
//     return data
// }


// login.addEventListener('click', async(e) => {
//     e.preventDefault()
//     let email = document.querySelector('#email').value
//     if(email == ''){
//         emailError.textContent = '*Please enter email'
//         return
//     }
//     let password = document.querySelector('#pwd').value
//     const data = await captureData()
//     let flag = 0
//     let emailFound = 0

//     //email and password check
//     for(let i = 0; i < data.length; i++){
//         if(data[i].email == email && data[i].password == password){
//             // const tuple = new User.update({_id:data[i]._id},{$set:{__v:1}})
//             // console.log(tuple);
//             flag = 1
//             // window.location.href = `http://localhost:8000/user/${data[i]._id}`
//             // myForm.action = `/user/${data[i]._id}`
//             // console.log(myForm);
//             myForm.submit()
//             break;
//         }

//         if(data[i].email == email)emailFound = 1
//     }
//     //if either of password or email is incorrect
//     if(!flag){
//         if(emailFound){
//             // window.location.reload()
//             emailError.textContent = ''
//             passwordError.textContent = '*Invalid password or email'
//             console.log(document.querySelector('#email').value = '')
//             console.log(document.querySelector('#pwd').value = '')
//         }
//         else{
//             emailError.textContent = '*Email not yet registered. Click Sign up'
//         }
//     }
// })

// googleLogin.addEventListener('click', (req, res) => {
//     window.location.href = 'http://localhost:8000/google'
// })

document.querySelector('.fa-xmark').addEventListener('click', (req, res) => {
    window.location.href = 'http://localhost:4000/api/v1/login'
})