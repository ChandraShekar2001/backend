const myForm = document.querySelector('#myForm')
const password = document.getElementById('pwd')
const cpassword = document.getElementById('cpwd')
// const cpassword = document.querySelector('#cpwd').value
const err_mssg = document.querySelector('.err-mssg')

// document.querySelector('.sub-button').addEventListener('click',(e)=>{
//     e.preventDefault();
//     if(!password || !cpassword){
//         err_mssg.textContent = "Please enter required fields"
//         err_mssg.classList.remove('dis')
//         return false
//     }
//     if(password!=cpassword){
//         err_mssg.textContent = "Passwords do not match!"
//         err_mssg.classList.remove('dis') 
//         return false
//     }
// })
function validator(){
    
    console.log(password.value);
    console.log(cpassword.value);
    if(!password.value || !cpassword.value){
        err_mssg.textContent = "Please enter required fields!"
        err_mssg.classList.remove('dis')
        return false
    }
    if(password.value!=cpassword.value){
        err_mssg.textContent = "Passwords do not match!"
        err_mssg.classList.remove('dis')
        return false
    }
    myForm.submit()
}

err_mssg.addEventListener('click',()=>{
    err_mssg.classList.add('dis')
})