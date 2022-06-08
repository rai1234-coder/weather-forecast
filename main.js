const key = '30e22145c1ca3713485768c105219d6d';
const formEl = document.querySelector('form');
const details = document.querySelector('.details');

formEl.addEventListener('submit', (e)=>{
    e.preventDefault();
    details.innerHTML = '<h1>Loading......</h1>';
    const location = e.target.location.value;
    weatherApp(location);
});
async function weatherApp(location){
    const data = await fetchApi(location);
    generateHTML(data);
}

async function fetchApi(location){
    const baseURL = `http://api.weatherstack.com/current?access_key=${key}&query=${location}`;
    const res = await fetch(baseURL);
    const data = await res.json();
    // console.log(data);
    return data;
}
function generateHTML(data){
    const html = `
    <div class="icons">
    <img src="${data.current.weather_icons}" >
</div>
    <h1 class="temp">${data.current.temperature}°C</h1>
    <h1 class="status">${data.current.weather_descriptions.map(item => item).join(' ')}</h1>
    <div class="more-info">
        <p>Humidity- ${data.current.humidity}%</p>
        <p>Wind Speed- ${data.current.wind_speed}km/hr</p>
        <p>Wind Direction- ${data.current.wind_dir}</p>
        <p>Pressure- ${data.current.pressure}MB</p>
    </div>
    <div class="query">${data.request.query}</div>
    `;
    details.innerHTML = html;
}