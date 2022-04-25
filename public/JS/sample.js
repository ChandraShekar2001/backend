async function captureData(){
    const url = "http://indianrailapi.com/api/v2/TrainSchedule/apikey/<apikey>/TrainNumber/<TrainNumber>/"
    const respone = await fetch(url)
    const data = await respone.json()
    console.log(data);
}


captureData()