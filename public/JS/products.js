
const container = document.querySelector('.container');

async function captureData(){
    url = 'http://localhost:8000/register'
    const response = await fetch(url)
    const data = await response.json();
    // console.log(data);
    return data;
}


async function loadData(){
    let data = await captureData();
    
    for(let i =0; i < data.length; i++){
        const Card = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.innerHTML = `${data[i].email}`
        Card.appendChild(h3);
        Card.classList.toggle('card')
        container.append(Card);
    }
}

loadData()

