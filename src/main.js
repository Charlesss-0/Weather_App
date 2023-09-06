import { format, parseISO } from "date-fns"

export function renderCurrentWeather () {
    const body = document.querySelector('body')
    const weatherInfo = document.getElementById('weather-info')
    const hourlyInfoEl = document.getElementById('hourly-info')
    const searchForm = document.getElementById('search-form')
    const searchInput = document.getElementById('search-input')

    async function getWeatherData (position) {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0112e4e65c914c9591532907232608&q=${lat},${lon}&days=7`,
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
        const windSpeed =  parseInt(response.current.wind_kph)
        const humidity = response.current.humidity
        const uvIndex = response.current.uv
        const cloud = response.current.cloud
        const sunrise = response.forecast.forecastday[0].astro.sunrise
        const sunset = response.forecast.forecastday[0].astro.sunset

        const currentDate = parseISO(response.forecast.forecastday[0].date)

        const formattedDate = format(currentDate, 'EEEE dd MMMM')

        hourlyInfoEl.innerHTML = ''
        weatherInfo.innerHTML = `
            <div class="mt-36 h-full flex flex-col gap-8">
                <div class="flex justify-evenly items-center text-center">
                    <h1 class="text-2xl font-semibold">
                        ${city}, ${region}, ${country}
                    </h1>

                    <div id="current-time" class="text-lg"></div>
                </div>

                <div class="flex justify-evenly gap-12 w-9/12 m-auto p-10 rounded-3xl bg-black/20">
                    <div class="flex flex-col items-center justify-center">
                        <img src="${iconCondition}" class="w-20">
                            
                        <p class="text-lg">
                            ${textCondition}
                        </p>
                    </div>

                    <div class="text-lg grid p-2">
                        <h2>
                            ${formattedDate}
                        </h2>

                        <div class="grid gap-1 text-4xl mt-5">
                            <p class="font-semibold">${tempC}°C</p>

                            <div class="flex items-center gap-2 text-lg">
                                <i class="fi fi-rr-temperature-high grid text-lg"></i>
                                <p>
                                    Feels Like ${feelslikeC}°
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="grid text-sm">
                        <h2 class="text-center">
                            More Details:
                        </h2>

                        <div class="nunito grid grid-cols-2 gap-x-10 gap-y-5 mt-5 [&>*]:flex [&>*]:items-center [&>*]:gap-2">
                            <div>
                                <i class="fi fi-rr-wind flex"></i> 
                                
                                <p>
                                    Wind Speed<br>
                                    ${windSpeed} km/h
                                </p>
                            </div>

                            <div>
                                <i class="fi fi-rr-raindrops grid"></i>

                                <p>
                                    Air Humidity<br> 
                                    ${humidity}%
                                </p>
                            </div>

                            <div>
                                <i class="fi fi-rr-sun grid"></i>

                                <p>
                                    UV Index<br>
                                    ${uvIndex} of 11
                                </p>
                            </div>

                            <div>
                                <i class="fi fi-rr-cloud grid"></i>

                                <p>
                                    Cloud Cover<br> 
                                    ${cloud}%
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="nunito flex items-center gap-10 p-3 [&>*]:grid [&>*]:justify-items-center [&>*]:text-sm">
                        <div>
                            <i class="fi fi-rr-sunrise-alt grid"></i>
                            <p>
                                ${sunrise}
                            </p>
                            <p>
                                Sunrise
                            </p>
                        </div>

                        <div>
                            <i class="fi fi-rr-sunset grid"></i>
                            <p>
                                ${sunset}
                            </p>
                            <p>
                                Sunset
                            </p>
                        </div>
                    </div>

                </div>

                <div id="daily-forecast" class="w-9/12 p-3 flex justify-around m-auto mt-10"></div>
            </div>
        `

        const dailyForecastEl = document.getElementById('daily-forecast')
        const daily = response.forecast.forecastday

        daily.forEach((day) => {
            const date = parseISO(day.date)
            const icon = day.day.condition.icon
            const maxTemp = parseInt(day.day.maxtemp_c)
            const minTemp = parseInt(day.day.mintemp_c)

            const formattedDate = format(date, 'EEE, MMM dd')

            const div = document.createElement('div')
            div.innerHTML = `
                <div class="nunito text-sm bg-black/40 w-32 grid justify-items-center gap-5 p-2 py-5 rounded-xl">
                    <p>
                        ${formattedDate}
                    </p>

                    <img src="${icon}" class="w-12">

                    <p class="warm">
                        ${maxTemp}°C
                    </p>

                    <div class="w-5 h-28 rounded-2xl custom-gradient"></div>

                    <p class="cool">
                        ${minTemp}°C
                    </p>
                </div>
            `
            dailyForecastEl.appendChild(div)
        })
    }

    async function renderCurrentTime (lat, lon) {
        const response = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=FB9X38BQ1RT7&format=json&by=position&lat=${lat}&lng=${lon}`, 
        { mode: 'cors' })
        const json = await response.json()
        getCurrentDate(json)
    }

    function getCurrentDate (response) {
        const currentTimeEl = document.getElementById('current-time')
        const dateTimeString = response.formatted

        const time = new Date(dateTimeString)

        const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

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
        }

        searchForm.reset()
    }
}