let elem1=document.getElementsByClassName('main-img');
elem1[0].style="display:block;";

let elem2=document.getElementsByClassName('grid-img');

for(let i=0;i<elem2.length;i++){
    elem2[i].addEventListener('click',function(){
        for(let j=0;j<elem1.length;j++){
            elem1[j].style="display:none;"; 
        }
        elem1[i].style="display:block;";
    });
}