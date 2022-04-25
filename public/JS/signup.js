// const createAccount = document.querySelector('.create-account');
// const phnError = document.querySelector('.phn-err');
// const emailError = document.querySelector('.email-err');
// const pwdError = document.querySelector('.pwd-err')
// const cpwdError = document.querySelector('.cpwd-err')
// const nameError = document.querySelector('.name-err')
// const signUpForm = document.querySelector('#sign-up-form')

// async function captureData(){
//     const url = 'http://localhost:8000/register'
//     const response = await fetch(url)
//     const data = await response.json()
//     return data
// }

// function validateName(){
//     const name = document.querySelector('#name').value
//     if(name != ''){
//         nameError.textContent = ''
//     }
// }

// function validateEmail() {
//     const email = document.querySelector('#email').value
//     console.log(email);
//     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
//         emailError.textContent = ''     
//         return true
//     }
//     else if(email == ''){
//         emailError.textContent = 'Please enter a valid email'
//     }
//     else{
//         emailError.textContent = '*Invalid email'
//         return false
//     }
// }

// function validatePhn() {
//     const number = document.querySelector('#num').value
//     console.log(number);
//     if (/^\d{10}$/.test(number)){
//         phnError.textContent = ''
//         return true   
//     }
//     else{
//         phnError.textContent = '*Invalid phone'
//         return false
//     }
// }

// function validatePass() {
//     const password = document.querySelector('#pwd').value
//     console.log(password);
//     if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)){
//         pwdError.textContent = ''
//         return true   
//     }
//     else{
//         pwdError.textContent = '*Password should contain atleast a sp. char. and number'
//         return false
//     }
// }

// function validateCpass() {
//     const password = document.querySelector('#pwd').value
//     const cpassword = document.querySelector('#cpwd').value
//     console.log(cpassword);
//     if (cpassword == password){
//         cpwdError.textContent = ''
//         return true   
//     }
//     else{
//         cpwdError.textContent = '*Password and confirm password do not match'
//         return false
//     }
// }


// createAccount.addEventListener('click', async(e)=>{
//     e.preventDefault();
//     const data = await captureData()
  
//     const name = document.querySelector('#name').value
//     const email = document.querySelector('#email').value
//     const number = document.querySelector('#num').value
//     const password = document.querySelector('#pwd').value
//     const cpassword = document.querySelector('#cpwd').value
//     let flag = 0
//     let empty = 0;
//     console.log(number);
//     //check for empty fields
//     if(name == ''){
//         nameError.textContent = '*Name cannot be empty'
//         empty = 1;
//         return
//     }
//     else if(number == ''){
//         phnError.textContent = '*Number cannot be empty'
//         empty = 1;
//         return 

//     }
//     else if(email == ''){
//         emailError.textContent = '*Email cannot be empty'
//         empty = 1;
//         return

//     }
//     else if(password == ''){
//         pwdError.textContent = '*Password cannot be empty'
//         empty = 1;
//         return
//     }
//     else if(cpassword == '' || cpassword!=password){
//         pwdError.textContent = '*Password and confirm passwords do not match'
//         empty = 1;
//         return
//     }
    
//     // if(empty == 1)return
//     //checking for uniqueness
//     for(let i = 0; i < data.length; i++) {
//         if(data[i].phoneNumber == number){
//             phnError.textContent ='*Phone number already exists'
//             flag = 1
//             break;
//         }
//         if(data[i].email == email){
//             emailError.textContent ='*Email already exists'
//             flag = 1
//             break;
//         }
//     }

//     if(!flag && password == cpassword){
//         signUpForm.submit()
//         const data = await captureData()
//         for(let i = 0; i < data.length; i++){
//             if(data[i].email == email){
//                 window.location.href = `http://localhost:8000/user/${data[i]._id}`
//                 break;
//             }
//         }
//     }

// })

document.querySelector('.fa-xmark').addEventListener('click', (req, res) => {
    window.location.href = 'http://localhost:4000/api/v1/signup'
})

