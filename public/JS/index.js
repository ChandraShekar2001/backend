const cart = document.querySelector('.cart-link')
const userIcon = document.querySelector('.user-icon')
const nav = document.querySelector('.nav')
const box = document.querySelector('.test .box-drop')
const box1 = document.querySelector('.test1 .box-drop')
const productButton = document.querySelector('.dropbtn')
const dropDownContent = document.querySelector('.dropdown-content')
const logout = document.querySelector('.logging-out')
const watches = document.querySelector('.watches')
const mobiles = document.querySelector('.phone')
const laptop = document.querySelector('.laptop')
const TV = document.querySelector('.smarttv')
const Home = document.querySelector('.Home')
const Accessories = document.querySelector('.accessories')


console.log(logout);



function preventBack(){window.history.forward();}

// logout.addEventListener('click', (e) => {
//     e.preventDefault()
//     setTimeout("preventBack()", 0);
//     window.onunload=function(){null};
//     window.location.href = 'http://localhost:8000/login'
// })



productButton.addEventListener('click',(e) => {
    e.preventDefault();
    if(dropDownContent.classList.contains('dis'))
        dropDownContent.classList.remove('dis')
    else
        dropDownContent.classList.add('dis')
})

nav.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log(e.target);
})


cart.addEventListener('click', (e) => {
    e.preventDefault()
    box1.classList.add('dis')
    box.classList.toggle('dis')
})

userIcon.addEventListener('click',(e) => {
    e.preventDefault()
    // box1.style.transition = 'all 1s'
    box.classList.add('dis')
    box1.classList.toggle('dis')
})

watches.addEventListener('click',()=>{
    window.location.href = "http://localhost:4000/api/v1/products?category=Watch"
})
laptop.addEventListener('click',()=>{
    window.location.href = "http://localhost:4000/api/v1/products?category=Laptop"
})

Home.addEventListener('click',()=>{
    window.location.href = "http://localhost:4000/api/v1/me"
})


mobiles.addEventListener('click',()=>{
    window.location.href = "http://localhost:4000/api/v1/products?category=Phone"
})

Accessories.addEventListener('click',()=>{
    window.location.href = "http://localhost:4000/api/v1/products?category=Accessories"
})


TV.addEventListener('click',()=>{
    window.location.href = "http://localhost:4000/api/v1/products?category=smart tv"
})