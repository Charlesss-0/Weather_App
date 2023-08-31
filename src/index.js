import { format, addDays, parse } from "date-fns"

const mainContent = document.getElementById('main-content')
const footerContent = document.getElementById('footer-content')
const asideContent = document.getElementById('aside-content')
const weatherInfo = document.getElementById('weather-info')
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const burgerMenu = document.getElementById('burger-menu')

async function getWeatherData () {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0112e4e65c914c9591532907232608&q=juigalpa&days=05`,
            { mode: 'cors' }
        )
    const json = await response.json()
    console.log(json)

    return json
}

getWeatherData()
    .then(renderWeather)

function renderWeather (response) {
    const city = response.location.name
    const region = response.location.region
    const country = response.location.country
    const textCondition = response.current.condition.text
    const iconCondition = response.current.condition.icon
    const feelslike = Math.floor(response.current.temp_c)
    const wind =  Math.floor(response.current.wind_kph)

    const dayOne = response.forecast.forecastday[0].day.condition.icon
    const dayTwo = response.forecast.forecastday[1].day.condition.icon
    const dayThree = response.forecast.forecastday[2].day.condition.icon

    const dayOneDate = response.forecast.forecastday[1].date
    const dayTwoDate = response.forecast.forecastday[2].date
    const dayThreeDate = response.forecast.forecastday[3].date

    const minTempDayOne = Math.floor(response.forecast.forecastday[0].day.mintemp_c)
    const maxTempDayOne = Math.floor(response.forecast.forecastday[0].day.maxtemp_c)

    const minTempDayTwo = Math.floor(response.forecast.forecastday[1].day.mintemp_c)
    const maxTempDayTwo = Math.floor(response.forecast.forecastday[1].day.maxtemp_c)

    const minTempDayThree = Math.floor(response.forecast.forecastday[2].day.mintemp_c)
    const maxTempDayThree = Math.floor(response.forecast.forecastday[2].day.maxtemp_c)

    weatherInfo.innerHTML = `
        <div class="mt-20 mx-auto p-3 h-full flex flex-col gap-8">
            <div class="flex justify-around items-center">
                <div id="current-date" class="text-lg"></div>

                <h1 class="text-2xl font-medium">
                    ${city}, ${region}, ${country}
                </h1>

                <div id="current-time" class="text-lg"></div>
            </div>

            <h2 class="text-center text-2xl font-medium">
                Now
            </h2>

            <div class="grid justify-items-center gap-y-2">
                <img src="${iconCondition}" class="w-12">

                <h1 class="text-5xl font-semibold">
                    ${feelslike}°C
                </h1>

                <p class="text-3xl font-medium my-10">
                    ${textCondition}
                </p>

                <p class="text-2xl grid gap-2 justify-items-center">
                    Wind<br>
                    <span class="text-lg flex items-center gap-3">
                        <i class="fi fi-rr-wind grid"></i>${wind} km/h
                    </span>
                </p>
            </div>

            <div class="w-full p-3 flex flex-col gap-3 mt-10">
                <div class="flex justify-around items-center">
                    <p>
                        ${dayOneDate}
                    </p>

                    <img src="${dayOne}" class="w-12">

                    <p>
                        min ${minTempDayOne}°C
                    </p>

                    <p>
                        max ${maxTempDayOne}°C
                    </p>
                </div>

                <div class="flex justify-around items-center">
                    <p>
                        ${dayTwoDate}
                    </p>

                    <img src="${dayTwo}" class="w-12">

                    <p>
                        min ${minTempDayTwo}°C
                    </p>

                    <p>
                        max ${maxTempDayTwo}°C
                    </p>
                </div>

                <div class="flex items-center justify-around items-center">
                    <p>
                        ${dayThreeDate}
                    </p>

                    <img src="${dayThree}" class="w-12">

                    <p>
                        min ${minTempDayThree}°C
                    </p>

                    <p>
                        max ${maxTempDayThree}°C
                    </p>
                </div>
            </div>
        </div>
    `
    
    getCurrentTime()
    getCurrentDate()

    setInterval(() => {
        getCurrentTime()
    }, 1000)
}

function getCurrentTime () {
    const currentTimeEl = document.getElementById('current-time')
    const now = new Date()
    const formattedTime = format(now, 'HH:mm:ss')

    currentTimeEl.innerHTML = `
        <p class="text-center">
            Time
        </p>

        <p>
            ${formattedTime}
        </p>
    `
}

function getCurrentDate () {
    const currentDateEl = document.getElementById('current-date')
    const now = new Date()
    const date = format(now, 'yyyy MM dd')

    currentDateEl.innerHTML = `
        <p class="text-center">
            Today
        </p>

        <p>
            ${date}
        </p>
    `

}

searchForm.addEventListener('submit', searchCity)

async function searchCity (event) {
    event.preventDefault()

    const input = searchInput.value
    if (input !== '') {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0112e4e65c914c9591532907232608&q=${input}&days=05`,
        { mode: 'cors' }
    )
        const json = await response.json()

        weatherInfo.innerHTML = ''
        footerContent.classList.remove('absolute', 'bottom-0', 'left-0', 'right-0')
        renderWeather(json)
    } else {
        weatherInfo.innerHTML = `
            <h1 class="mt-24 text-gray-200 text-3xl text-center">
                City Not Found,<br>
                Please Provide a Name!
            </h1>
        `
        footerContent.classList.add('absolute', 'bottom-0', 'left-0','right-0')
    }
    searchForm.reset()
}

burgerMenu.addEventListener('click', hideOptions)

function hideOptions () {
    asideContent.classList.toggle('translate-left')
    mainContent.classList.toggle('margin-left-none')
    footerContent.classList.toggle('margin-left-none')
}