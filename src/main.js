import { format, parseISO } from "date-fns"

export function renderCurrentWeather () {
    const body = document.querySelector('body')
    const weatherInfo = document.getElementById('weather-info')
    const hourlyInfoEl = document.getElementById('hourly-info')
    const footerContent = document.getElementById('footer-content')
    const searchForm = document.getElementById('search-form')
    const searchInput = document.getElementById('search-input')

    const sunny = 'sunny'
    const rainny = 'rain'
    const cloudy = 'cloudy'
    const overcast = 'overcast'
    const mist = 'mist'
    const clear = 'Clear'

    async function getWeatherData (position) {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0112e4e65c914c9591532907232608&q=${lat},${lon}&days=05`,
        { mode: 'cors' })
        const json = await response.json()
        renderWeather(json)
        renderCurrentTime(lat, lon)
        const textCondition = json.current.condition.text

        if (textCondition.includes(cloudy)) {
            body.className = ''
            body.classList.add('cloudy')

        } else if (textCondition.includes(sunny)) {
            body.className = ''
            body.classList.add('sunny')

        } else if (textCondition.includes(rainny)) {
            body.className = ''
            body.classList.add('rainny')

        } else if (textCondition.includes(overcast)) {
            body.className = ''
            body.classList.add('overcast')

        } else if (textCondition.includes(mist)) {
            body.className = ''

            body.classList.add('mist')
        } else if (textCondition.includes(clear)) {
            body.className = ''
            body.classList.add('clear')
        }
    }

    navigator.geolocation.getCurrentPosition(getWeatherData)

    function renderWeather (response) {
        const city = response.location.name
        const region = response.location.region
        const country = response.location.country
        const textCondition = response.current.condition.text
        const iconCondition = response.current.condition.icon
        const tempC = parseInt(response.current.temp_c)
        const feelslikeC = parseInt(response.current.feelslike_c)
        const wind =  parseInt(response.current.wind_kph)
        const windDir = response.current.wind_dir

        const dateOne = parseISO(response.forecast.forecastday[0].date)
        const dateTwo = parseISO(response.forecast.forecastday[1].date)
        const dateThree = parseISO(response.forecast.forecastday[2].date)
        const dateFour = parseISO(response.forecast.forecastday[3].date)

        const dayNameOne = format(dateOne, 'EEEE, MMM d')
        const dayNameTwo = format(dateTwo, 'EEEE, MMM d')
        const dayNameThree = format(dateThree, 'EEEE, MMM d')
        const dayNameFour = format(dateFour, 'EEEE, MMM d')

        const dayOneIcon = response.forecast.forecastday[0].day.condition.icon
        const dayTwoIcon = response.forecast.forecastday[1].day.condition.icon
        const dayThreeIcon = response.forecast.forecastday[2].day.condition.icon
        const dayFourIcon = response.forecast.forecastday[3].day.condition.icon

        const minTempDayOne = parseInt(response.forecast.forecastday[0].day.mintemp_c)
        const maxTempDayOne = parseInt(response.forecast.forecastday[0].day.maxtemp_c)

        const minTempDayTwo = parseInt(response.forecast.forecastday[1].day.mintemp_c)
        const maxTempDayTwo = parseInt(response.forecast.forecastday[1].day.maxtemp_c)

        const minTempDayThree = parseInt(response.forecast.forecastday[2].day.mintemp_c)
        const maxTempDayThree = parseInt(response.forecast.forecastday[2].day.maxtemp_c)

        const minTempDayFour = parseInt(response.forecast.forecastday[3].day.mintemp_c)
        const maxTempDayFour = parseInt(response.forecast.forecastday[3].day.maxtemp_c)

        hourlyInfoEl.innerHTML = ''
        weatherInfo.innerHTML = `
            <div 
                class="
                    mt-32 
                    mx-auto 
                    p-3 
                    h-full 
                    flex 
                    flex-col 
                    gap-8"
                    >
                <div 
                    class="
                        flex 
                        justify-evenly 
                        items-center 
                        [&>*]:text-center"
                        >
                    <div id="current-date" class="text-lg"></div>

                    <h1 class="text-2xl font-medium">
                        ${city}, ${region}, ${country}
                    </h1>

                    <div id="current-time" class="text-lg"></div>
                </div>

                <h2 class="text-center text-2xl font-medium">
                    Now
                </h2>

                <div 
                    class="
                        grid 
                        justify-items-center 
                        gap-y-2"
                        >
                    <img src="${iconCondition}" class="w-14">

                    <div class="grid gap-2">
                        <p class="text-5xl text-center font-semibold">
                            ${tempC}°C
                        </p>

                        <div class="text-lg flex items-center gap-3">
                            <i class="fi fi-rr-temperature-high"></i>
                            <p>
                                Feels Like<br>
                                ${feelslikeC}°C
                            </p>
                        </div>
                    </div>

                    <p class="text-3xl font-medium my-10">
                        ${textCondition}
                    </p>

                    <p class="text-2xl grid gap-2 justify-items-center">
                        Wind<br>
                        <span class="text-lg flex items-center gap-3">
                            <i class="fi fi-rr-wind grid"></i>${windDir} ${wind} km/h
                        </span>
                    </p>
                </div>

                <div 
                    class="
                        max-w-5xl
                        p-3 
                        flex 
                        flex-col 
                        gap-3 
                        m-auto
                        mt-10"
                        >
                    <div class="flex justify-between items-center custom-gap-4vw">
                        <p>
                            ${dayNameOne}
                        </p>

                        <img src="${dayOneIcon}" class="w-12">

                        <p>
                            Min (${minTempDayOne}°C)
                        </p>

                        <p>
                            Max (${maxTempDayOne}°C)
                        </p>
                    </div>

                    <div class="flex justify-between items-center">
                        <p>
                        ${dayNameTwo}
                        </p>

                        <img src="${dayTwoIcon}" class="w-12">

                        <p>
                            Min (${minTempDayTwo}°C)
                        </p>

                        <p>
                            Max (${maxTempDayTwo}°C)
                        </p>
                    </div>

                    <div class="flex justify-between items-center">
                        <p>
                            ${dayNameThree}
                        </p>

                        <img src="${dayThreeIcon}" class="w-12">

                        <p>
                            Min (${minTempDayThree}°C)
                        </p>

                        <p>
                            Max (${maxTempDayThree}°C)
                        </p>
                    </div>

                    <div class="flex justify-between items-center">
                        <p>
                            ${dayNameFour}
                        </p>

                        <img src="${dayFourIcon}" class="w-12">

                        <p>
                            Min (${minTempDayFour}°C)
                        </p>

                        <p>
                            Max (${maxTempDayFour}°C)
                        </p>
                    </div>
                </div>
            </div>
        `
    }

    async function renderCurrentTime (lat, lon) {
        const response = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=FB9X38BQ1RT7&format=json&by=position&lat=${lat}&lng=${lon}`, 
        { mode: 'cors' })
        const json = await response.json()
        getCurrentDate(json)
    }

    function getCurrentDate (response) {
        const currentDateEl = document.getElementById('current-date')
        const currentTimeEl = document.getElementById('current-time')
        const dateTimeString = response.formatted

        const dateTime = new Date(dateTimeString)

        const formattedDate = format(dateTime, 'EEEE, MMM d')
        const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        currentDateEl.innerHTML = `
            <p class="text-center">
                Date
            </p>

            <p>
                ${formattedDate}
            </p>
        `

        currentTimeEl.innerHTML = `
            <p class="text-center">
                Time
            </p>

            <p>
                ${formattedTime}
            </p>
        `
    }

    searchForm.addEventListener('submit', searchCity)

    async function searchCity (event) {
        event.preventDefault()

        const input = searchInput.value
        if (input !== '') {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0112e4e65c914c9591532907232608&q=${input}&days=05`,
            { mode: 'cors' })
            const json = await response.json()

            weatherInfo.innerHTML = ''
            footerContent.classList.remove('absolute', 'bottom-0', 'left-0', 'right-0')
            renderWeather(json)

            const lat = json.location.lat
            const lon = json.location.lon
            renderCurrentTime(lat, lon)

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
}