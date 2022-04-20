const api ={
    key: 'a5c79c96fc1f6e07fd3f39ac75ad4190',
    url: 
    'https://api.openweathermap.org/data/2.5/weather'

}
const card = document.getElementById('card')

const city = document.getElementById('city');
const date = document.getElementById('date');
const tempimage = document.getElementById('temp-image');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');
async function search(query){
    try {
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        const data = await response.json();
        card.style.display = 'block';
        city.innerHTML = `${data.name},${data.sys.country}`;
        data.date = (new Date()).toLocaleDateString();
        temp.innerHTML = `${toCelsius( data.main.temp)}c`;
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `${toCelsius (data.main.temp_min)}c/${toCelsius( data.main.temp_max)}c`
        updateImage(data);
    } catch(err){
        console.log(err);
        alert('Hubo un error');
    }
}
function updateImage(data){
    const temp = toCelsius(data.main.temp);
    let src ='images/temp-mid.png';
    if(temp > 26){
        src ='images/temp-high.png';
    }else if(temp <20){
        src = 'images/temp-low.png'
    }
    tempimage.src = src;
}



function onSubmit(event){
    event.preventDefault();
    search(searchbox.value);
}

const form = document.getElementById('search-form');
const searchbox = document.getElementById('searchbox');
form.addEventListener('submit',onSubmit,true )

function toCelsius(kelvin){
    return Math.round(kelvin - 273.15);
}
