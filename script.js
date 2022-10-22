const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const dayEl = document.getElementById('day');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const currentDayWeather = document.getElementById('current-day-weather');
const currentDayWeather2 = document.getElementById('current-day-weather2');
const temperture = document.getElementsByClassName('temp1');
const placeContainer =document.getElementById('place-container');



const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const year = time.getFullYear();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'
    dayEl.innerHTML = days[day] 
    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = date+ ' ' + months[month]+ ' ' + year

}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((pos) => {
        let lat = pos.coords.latitude;
        let long = pos.coords.longitude;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            
        console.log(data)
        showWeatherData(data);
        
        })

    })
}
//..............222222...

        
 
//...................
function showWeatherData (data){
    let {temp, humidity, pressure, sunrise, sunset, wind_speed } = data.current;
    let {main, icon } = data.current.weather[0];
    currentWeatherItemsEl.innerHTML = 
    `
    <div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>

    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    `;
 
    currentDayWeather.innerHTML=`
    <div class="current-day-weather" id="current-day-weather">
    <div class="weather-item" id="current-temp">
    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" class="w-icon1">
    <div class=temp1>${Math.round(temp)}&#176; C</div>
    <div class="temp2">${main}</div>
</div></div>
       
`;
    //..............222222...

 
    //........current data.......
    
    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="other">
            <div class="temp1">${day.weather[0].main + ' : '+ day.weather[0].description} </div
            </div> 
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Max - ${Math.round(day.temp.max)}&#176;C </div>
                <div class="temp">Min - ${Math.round(day.temp.min)}&#176;C</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
   
}
   //...........City....
   
async function fetchlocation(){
    let response = await fetch('https://ipinfo.io/39.32.97.71/json?token=6b76dc920d95e6');
    let data = await response.json();
    console.log(data);
    


placeContainer.innerHTML=`
        <div class="container">
        <div class="place-container" id="place-container">
            <div id="country" class="country">${data.city}</div>
            </div>  
        </div>
`;
}
fetchlocation();