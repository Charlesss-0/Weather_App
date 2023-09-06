import { format, parseISO } from "date-fns"

export function renderCurrentWeather () {
    const body = document.querySelector('body')
    const weatherInfo = document.getElementById('weather-info')
    const hourlyInfoEl = document.getElementById('hourly-info')
    const footerContent = document.getElementById('footer-content')
    const searchForm = document.getElementById('search-form')
    const searchInput = document.getElementById('search-input')

    async function getWeatherData (position) {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0112e4e65c914c9591532907232608&q=${lat},${lon}&days=05`,
        { mode: 'cors' })
        const json = await response.json()
        renderWeather(json)
        renderCurrentTime(lat, lon)
        handleBackgroundColor(json)
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
        const humidity = response.current.humidity
        const dewPoint = response

        const dateOne = parseISO(response.forecast.forecastday[0].date)
        const dateTwo = parseISO(response.forecast.forecastday[1].date)
        const dateThree = parseISO(response.forecast.forecastday[2].date)
        const dateFour = parseISO(response.forecast.forecastday[3].date)

        const dayNameOne = format(dateOne, 'EEE, MMM d')
        const dayNameTwo = format(dateTwo, 'EEE, MMM d')
        const dayNameThree = format(dateThree, 'EEE, MMM d')
        const dayNameFour = format(dateFour, 'EEE, MMM d')

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
                    mt-36
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

                <div id="weather-background"
                    class="
                        w-max
                        m-auto
                        flex
                        justify-evenly
                        items-center
                        gap-10
                        p-10
                        rounded-2xl
                        background-zinc-800
                        backdrop-blur
                        [&>*]:flex
                        [&>*]:gap-16
                        [&>*]:p-2"
                        >
                    <div>
                        <div class="grid gap-2">
                            <p class="text-6xl text-center font-semibold">
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

                        <div class="flex items-center gap-5">
                            <img src="${iconCondition}" class="w-14">

                            <p class="text-2xl font-medium my-10">
                                ${textCondition}
                            </p>
                        </div>
                    </div>

                    <div class="[&>*]:flex [&>*]:items-center [&>*]:gap-3 text-lg">
                        <div class="flex items-center gap-3">
                            <i class="fi fi-rr-wind"></i>
                        
                            <p>
                                Wind<br>
                                ${windDir} ${wind} km/h
                            </p>
                        </div>

                        <div>
                            <i class="fi fi-rr-raindrops"></i>
                            <p>
                                Humidity<br>
                                ${humidity}%
                            </p>
                        </div>
                    </div>
                </div>

                <div 
                    class="
                        p-3 
                        flex 
                        gap-10
                        m-auto
                        mt-10
                        [&>*]:w-28
                        [&>*]:grid
                        [&>*]:justify-items-center
                        [&>*]:gap-5
                        [&>*]:p-2
                        [&>*]:py-5
                        [&>*]:rounded-xl"
                        >
                    <div class="background-zinc-800">
                        <p>
                            ${dayNameOne}
                        </p>

                        <img src="${dayOneIcon}" class="w-12">

                        <p>
                            ${maxTempDayOne}°C
                        </p>

                        <div class="w-5 h-20 rounded-2xl custom-gradient"></div>

                        <p>
                            ${minTempDayOne}°C
                        </p>
                    </div>

                    <div class="background-zinc-800">
                        <p>
                        ${dayNameTwo}
                        </p>

                        <img src="${dayTwoIcon}" class="w-12">

                        <p>
                            ${maxTempDayTwo}°C
                        </p>

                        <div class="w-5 h-20 rounded-2xl custom-gradient"></div>

                        <p>
                            ${minTempDayTwo}°C
                        </p>
                    </div>

                    <div class="background-zinc-800">
                        <p>
                            ${dayNameThree}
                        </p>

                        <img src="${dayThreeIcon}" class="w-12">

                        <p>
                            ${maxTempDayThree}°C
                        </p>

                        <div class="w-5 h-20 rounded-2xl custom-gradient"></div>

                        <p>
                            ${minTempDayThree}°C
                        </p>
                    </div>

                    <div class="background-zinc-800">
                        <p>
                            ${dayNameFour}
                        </p>

                        <img src="${dayFourIcon}" class="w-12">

                        <p>
                            ${maxTempDayFour}°C
                        </p>

                        <div class="w-5 h-20 rounded-2xl custom-gradient"></div>

                        <p>
                            ${minTempDayFour}°C
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

    function handleBackgroundColor (json) {
        const sunny = 'sunny'
        const rainny = 'rain'
        const cloudy = 'cloudy'
        const overcast = 'overcast'
        const mist = 'Mist'
        const fog = 'Fog'
        const clear = 'Clear'
    
        const weatherCondition = json.current.condition.text

        if (weatherCondition.includes(cloudy)) {
            body.className = ''
            body.classList.add('cloudy')

        } else if (weatherCondition.includes(sunny)) {
            body.className = ''
            body.classList.add('sunny')

        } else if (weatherCondition.includes(rainny)) {
            body.className = ''
            body.classList.add('rainny')

        } else if (weatherCondition.includes(overcast)) {
            body.className = ''
            body.classList.add('overcast')

        } else if (weatherCondition.includes(mist) || weatherCondition.includes(fog)) {
            body.className = ''
            body.classList.add('mist')

        } else if (weatherCondition.includes(clear)) {
            body.className = ''
            body.classList.add('clear')
        }
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