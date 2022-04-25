
function deleteFolder(element) {
    // const val = element.parentNode.parentNode
    // val.remove()
    // const val = element.getElementsByClassName("card-title btn-success folder-name")
    const nameOfFolder = element.previousSibling.innerHTML
    console.log(nameOfFolder)
    for(let i = 0;i<array.length;i++){
        if(nameOfFolder == array[i]){
            array.splice(i,1);
            localStorage.setItem("array", JSON.stringify(array))
        }
    }
    console.log(array)
    window.location.href = window.location.href
}

function clearInputData() {
    document.getElementById("folder-form").reset();
}

function validateForm() {
    const x = document.forms[myForm][fname].value;
    if (x == '') {
        alert("Folder name must be filled out");
        return false;
    }
}

// localStorage.setItem('array','[]')

var arrayfromLS = localStorage.getItem("array");
var array = arrayfromLS ? JSON.parse(arrayfromLS) : [];
console.log(array)




document.addEventListener("DOMContentLoaded", function () {
    for (let i = 0; i < array.length; i++) {
        const divOuter = document.createElement("div");
        const imgInner = document.createElement("img");
        const divInner = document.createElement("div");
        const button1 = document.createElement("button");
        const button2 = document.createElement("button");
        const deleteIcon = document.createElement('i')
        button1.innerHTML = array[i]
        button2.innerHTML = "Delete "
        deleteIcon.setAttribute('class', 'bi bi-trash')
        divOuter.setAttribute('class', 'card')
        imgInner.setAttribute('class', 'card-img-top')
        imgInner.setAttribute('src', '../Images/carousel-1.jpg')
        divInner.setAttribute('class', 'card-body')
        button1.setAttribute('class', 'card-title btn-success folder-name')
        button2.setAttribute('class', 'card-title btn-success folder-name')
        button2.setAttribute('onclick', 'deleteFolder(this)')
        button2.appendChild(deleteIcon)
        divInner.appendChild(button2)
        divInner.insertBefore(button1, button2)
        divOuter.appendChild(divInner)
        divOuter.insertBefore(imgInner, divInner)

        const element = document.getElementsByClassName("grid-container")
        element[0].append(divOuter)
    }
    document.getElementById("folder-form").reset();
})

function addFolder() {
    const divOuter = document.createElement("div");
    const imgInner = document.createElement("img");
    const divInner = document.createElement("div");
    const button1 = document.createElement("button");
    const button2 = document.createElement("button");
    const deleteIcon = document.createElement('i')
    const val = document.querySelector(".form-folder-data").value
    let l = array.length;
    array[l] = val
    console.log(array)
    // array.push(val);
    localStorage.setItem("array", JSON.stringify(array));
    button1.innerHTML = val
    button2.innerHTML = "Delete "
    divOuter.setAttribute('class', 'card')
    imgInner.setAttribute('class', 'card-img-top')
    imgInner.setAttribute('src', '../Images/carousel-1.jpg')
    divInner.setAttribute('class', 'card-body')
    button1.setAttribute('class', 'card-title btn-success folder-name')
    button2.setAttribute('class', 'card-title btn-success folder-name')
    button2.setAttribute('onclick', 'deleteFolder(this)')
    button2.appendChild(deleteIcon)
    divInner.appendChild(button2)
    divInner.insertBefore(button1, button2)
    divOuter.appendChild(divInner)
    divOuter.insertBefore(imgInner, divInner)

    const element = document.getElementsByClassName("grid-container")
    element[0].append(divOuter)

    document.getElementById("folder-form").reset();
    return true
}

function ascendingOrder() {
    let array = document.querySelectorAll('.folder-name')
    console.log(array);
    let array1 = [];
    let array2 = [];
    for (let i = 0; i < array.length; i++) {
        array1.push(array[i].innerHTML)
    }
    array1.sort()
    for (let j = 0; j < array.length; j++) {
        for (let k = 0; k < array.length; k++) {
            if (array1[j] == array[k].innerHTML) {
                array2.push(array[k])
            }
        }
    }


    const element = document.getElementsByClassName('grid-container')
    for (let i = 0; i < array.length; i++) {
        element[0].appendChild(array2[i].parentNode.parentNode)
    }
}

function descendingOrder() {
    let array = document.querySelectorAll('.folder-name')
    let array1 = [];
    let array2 = [];
    for (let i = 0; i < array.length; i++) {
        array1.push(array[i].innerHTML)
    }
    array1.sort().reverse()
    for (let j = 0; j < array.length; j++) {
        for (let k = 0; k < array.length; k++) {
            if (array1[j] == array[k].innerHTML) {
                array2.push(array[k])
            }
        }
    }


    const element = document.getElementsByClassName('grid-container')
    for (let i = 0; i < array.length; i++) {
        element[0].appendChild(array2[i].parentNode.parentNode)
    }
}