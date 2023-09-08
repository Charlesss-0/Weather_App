import { renderWeather } from "./weather"
import { getDailyData } from "./daily"
import { getHourlyData } from "./hourly"
import { handleArrowClickEvents } from "./arrowEvents"

const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')

// Retrieves and renders the weather data of the current position
async function getWeatherData (position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude

    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0112e4e65c914c9591532907232608&q=${lat},${lon}&days=8`,
    { mode: 'cors' })
    const json = await response.json()
    renderWeather(json)
    renderLocation(json)
    getCurrentTime(lat, lon)
    handleBackgroundColor(json)
}
navigator.geolocation.getCurrentPosition(getWeatherData)

// Renders the weather data of the searched city
async function getSearchResult (event) {
    event.preventDefault()

    const input = searchInput.value
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0112e4e65c914c9591532907232608&q=${input}&days=08`,
    { mode: 'cors' })
    const json = await response.json()
    const lat = json.location.lat
    const lon = json.location.lon

    renderWeather(json)
    renderLocation(json)
    getCurrentTime(lat, lon)
    handleBackgroundColor(json)

    searchForm.reset()
}
searchForm.addEventListener('submit', getSearchResult)

// API to get any localtime, in this case the localtime for the current position or the searched city
async function getCurrentTime (lat, lon) {
    const response = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=FB9X38BQ1RT7&format=json&by=position&lat=${lat}&lng=${lon}`, 
    { mode: 'cors' })
    const json = await response.json()
    renderCurrentTime(json)
}

function renderCurrentTime (response) {
    const currentTime = document.getElementById('time')
    const dateTimeString = response.formatted
    const time = new Date(dateTimeString)
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    currentTime.innerHTML = `
        <p class="text-center text-lg">
            ${formattedTime}
        </p>
    `
}

function renderLocation (response) {
    const location = document.getElementById('location')

    const city = response.location.name
    const region = response.location.region
    const country = response.location.country

    location.innerHTML = `
        <h1 class="text-lg flex items-center gap-2">
            <i class="fi fi-rr-marker grid"></i> Weather in <span class="font-semibold">${city}, ${region}, ${country}</span>
        </h1>
    `
}

// It gets exported to weather.js module
// It handles the daily.js and hourly.js modules by rendering their content
export function switchDailyHourly (response) {
    const dailyHourly = document.getElementById('daily-hourly')
    const daily = document.getElementById('daily')
    const hourly = document.getElementById('hourly')

    renderDailyWeather()
    daily.addEventListener('click', renderDailyWeather)
    hourly.addEventListener('click', renderHourlyWeather)

    function renderDailyWeather () {
        hourly.classList.remove('bg-black/50')
        daily.classList.add('bg-black/50')
        dailyHourly.classList.add('justify-center')
        
        dailyHourly.innerHTML = ''
        const dailyData = response.forecast.forecastday
        dailyData.forEach((day) => getDailyData(day, dailyHourly))
    }

    function renderHourlyWeather () {
        daily.classList.remove('bg-black/50')
        hourly.classList.add('bg-black/50')
        dailyHourly.classList.remove('justify-center')
    
        dailyHourly.innerHTML = ''
        const hourlyData = response.forecast.forecastday[0].hour
        hourlyData.forEach((hour) => getHourlyData(hour, dailyHourly))
        handleArrowClickEvents(dailyHourly)
    }
}

// Changes background image depending on the weather condition
function handleBackgroundColor (json) {
    const body = document.querySelector('body')
    const weatherCondition = json.current.condition.text

    if (weatherCondition.includes('cloudy')) {
        body.className = ''
        body.classList.add('cloudy')

    } else if (weatherCondition.includes('Sunny')) {
        body.className = ''
        body.classList.add('sunny')

    } else if (weatherCondition.includes('rain')) {
        body.className = ''
        body.classList.add('rainny')

    } else if (weatherCondition.includes('Overcast')) {
        body.className = ''
        body.classList.add('overcast')

    } else if (weatherCondition.includes('Mist')) {
        body.className = ''
        body.classList.add('mist')

    } else if (weatherCondition.includes('Fog')) {
        body.className = ''
        body.classList.add('fog')

    } else if (weatherCondition.includes('Clear')) {
        body.className = ''
        body.classList.add('clear')
    }
}
