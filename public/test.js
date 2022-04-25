const cart = document.querySelector('.cart-link')
const userIcon = document.querySelector('.user-icon')

const box = document.querySelector('.test .box-drop')
const box1 = document.querySelector('.test1 .box-drop')


cart.addEventListener('click', (e) => {
    e.preventDefault();
    box.style.transition = 'all 1s'
    box1.classList.add('dis')
    box.classList.toggle('dis')
})

userIcon.addEventListener('click',(e) => {
    e.preventDefault()
    box1.style.transition = 'all 1s'
    box.classList.add('dis')
    box1.classList.toggle('dis')
})
