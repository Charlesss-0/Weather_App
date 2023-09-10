import { renderWeather } from "./weather"
import { getDailyData } from "./daily"
import { getHourlyData } from "./hourly"
import { handleArrowClickEvents } from "./arrowEvents"

import cloudyDay from './assets/cloudy-day.png'
import overcastDay from './assets/overcast-day.png'
import sun from './assets/sun.png'
import moderateRain from './assets/moderate.png'
import heavyRain from './assets/heavy.png'
import possibleRain from './assets/possible.png'
import mist from './assets/mist.png'
import fog from './assets/fog.png'
import storm from './assets/storm.png'
import moon from './assets/moon.png'
import cloudyNight from './assets/cloudy-night.png'
import overcastNight from './assets/overcast-night.png'
import cloudy from './assets/cloudy.png'

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
    const time = document.getElementById('time')
    const dateTimeString = response.formatted
    const timeDate = new Date(dateTimeString)
    const formattedTime = timeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })

    time.textContent = formattedTime
}

function renderLocation (response) {
    const location = document.getElementById('location')

    const city = response.location.name
    const region = response.location.region
    const country = response.location.country

    location.innerHTML = `
        <h1 class="text-base flex items-center gap-2 sm-text-lg font-size-sm">
            <i class="fi fi-rr-marker grid"></i> 
            <span>
                Weather in <span class="font-semibold">${city},</span> ${region}, ${country}
            </span>
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
    // renderHourlyWeather()
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

    switch (true) {
        case weatherCondition.includes('cloudy'):
            body.className = ''
            body.classList.add('cloudy')
            break
        case weatherCondition.includes('Sunny'):
            body.className = ''
            body.classList.add('sunny')
            break
        case weatherCondition.includes('thunder'):
            body.className = ''
            body.classList.add('thunder')
            break
        case weatherCondition.includes('rain'):
            body.className = ''
            body.classList.add('rainny')
            break
        case weatherCondition.includes('Overcast'):
            body.className = ''
            body.classList.add('overcast')
            break
        case weatherCondition.includes('Mist'):
            body.className = ''
            body.classList.add('mist')
            break
        case weatherCondition.includes('Fog'):
            body.className = ''
            body.classList.add('fog')
            break
        case weatherCondition.includes('Clear'):
            body.className = ''
            body.classList.add('clear')
            break
    }
}

// It gets exported to weather.js, daily.js, and hourly.js modules
// Sets the icon for the current weather condition
export function getConditionIcon (img, condition) {
    switch (true) {
        case condition.includes('day/116'):
            img.src = cloudyDay
            break
        case condition.includes('119'):
            img.src = cloudy
            break
        case condition.includes('day/113'):
            img.src = sun
            break
        case condition.includes('176') || condition.includes('353'):
            img.src = possibleRain
            break
        case condition.includes('308'):
            img.src = heavyRain
            break
        case condition.includes('302') || condition.includes('356') || condition.includes('299'):
            img.src = moderateRain
            break
        case condition.includes('143'):
            img.src = mist
            break
        case condition.includes('248'):
            img.src = fog
            break
        case condition.includes('day/122'):
            img.src = overcastDay
            break
        case condition.includes('night/116'):
            img.src = cloudyNight
            break
        case condition.includes('night/113'):
            img.src = moon
            break
        case condition.includes('night/122'):
            img.src = overcastNight
            break
    }
}