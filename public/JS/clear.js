const pagination = document.querySelector('.pagination')

function clearall()
{
    let checkBoxes = document.querySelectorAll("input[type='checkbox']")

    let radio = document.querySelectorAll("input[type = 'radio']")

    checkBoxes.forEach((item)=>item.checked = false)

    radio.forEach((item)=>item.checked = false)
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

pagination.addEventListener('click',(e)=>{
    const number = (e.target.textContent)
    console.log(number);
    let url = window.location.href
    let and = '&page='

    if(url.includes(and)){
        url = setCharAt(url,url.length-1,`${number}`);        
        window.location.href = url
    }

    else{
        let url1 = url.replace('#','')
        url1+=`&page=${number}` 
        window.location.href = url1
    }
})  
