const weatherInfo = document.getElementById('weather-info')
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')

async function getWeatherData () {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0112e4e65c914c9591532907232608&q=juigalpa&days=05`,
            { mode: 'cors' }
        )
        const json = await response.json()
    
        return json    
    } catch (error) {
        console.log(error)
    }
}

getWeatherData()
    .then(renderWeather)
    .catch(console.log)

async function renderWeather (response) {
    const city = await response.location.name
    const region = await response.location.region
    const textCondition = await response.current.condition.text
    const iconCondition = await response.current.condition.icon
    const feelslike = Math.floor(response.current.temp_c)
    const wind =  Math.floor(response.current.wind_kph)

    const dayOne = await response.forecast.forecastday[0].day.condition.icon
    const dayTwo = await response.forecast.forecastday[1].day.condition.icon
    const dayThree = await response.forecast.forecastday[2].day.condition.icon

    const minTempDayOne = Math.floor(response.forecast.forecastday[0].day.mintemp_c)
    const maxTempDayOne = Math.floor(response.forecast.forecastday[0].day.maxtemp_c)

    const minTempDayTwo = Math.floor(response.forecast.forecastday[1].day.mintemp_c)
    const maxTempDayTwo = Math.floor(response.forecast.forecastday[1].day.maxtemp_c)

    const minTempDayThree = Math.floor(response.forecast.forecastday[2].day.mintemp_c)
    const maxTempDayThree = Math.floor(response.forecast.forecastday[2].day.maxtemp_c)

    weatherInfo.innerHTML = `
        <div class="mt-16 mx-auto max-w-lg p-3 h-full flex flex-col gap-10">
            <h1 class="text-center text-2xl font-medium mb-10">
                ${city}, ${region}
            </h1>

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

            <div class="w-full p-3 flex flex-col gap-3">
                <div class="flex justify-around items-center">
                    <img src="${dayOne}" class="w-12">

                    <p>
                        ${minTempDayOne}°C
                    </p>

                    <p>
                        ${maxTempDayOne}°C
                    </p>
                </div>

                <div class="flex justify-around items-center">
                    <img src="${dayTwo}" class="w-12">

                    <p>
                        ${minTempDayTwo}°C
                    </p>

                    <p>
                        ${maxTempDayTwo}°C
                    </p>
                </div>

                <div class="flex items-center justify-around items-center">
                    <img src="${dayThree}" class="w-12">

                    <p>
                        ${minTempDayThree}°C
                    </p>

                    <p>
                        ${maxTempDayThree}°C
                    </p>
                </div>
            </div>
        </div>
    `
}

searchForm.addEventListener('submit', searchCity)

async function searchCity (event) {
    event.preventDefault()

    const input = searchInput.value
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0112e4e65c914c9591532907232608&q=${input}&days=05`,
        { mode: 'cors' }
    )
    const json = await response.json()

    weatherInfo.innerHTML = ''
    renderWeather(json)

    searchForm.reset()
}