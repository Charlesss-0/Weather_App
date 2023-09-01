import { format, parseISO } from "date-fns"

export function renderCurrentWeather () {
    const weatherInfo = document.getElementById('weather-info')
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
        console.log(json)
    }

    navigator.geolocation.getCurrentPosition(getWeatherData)

    function renderWeather (response) {
        const city = response.location.name
        const region = response.location.region
        const country = response.location.country
        const textCondition = response.current.condition.text
        const iconCondition = response.current.condition.icon
        const feelslike = Math.floor(response.current.temp_c)
        const wind =  Math.floor(response.current.wind_kph)

        const dayOneIcon = response.forecast.forecastday[1].day.condition.icon
        const dayTwoIcon = response.forecast.forecastday[2].day.condition.icon
        const dayThreeIcon = response.forecast.forecastday[3].day.condition.icon

        const dateOne = parseISO(response.forecast.forecastday[1].date)
        const dateTwo = parseISO(response.forecast.forecastday[2].date)
        const dateThree = parseISO(response.forecast.forecastday[3].date)

        const dayNameOne = format(dateOne, 'EEEE, MMM dd')
        const dayNameTwo = format(dateTwo, 'EEEE, MMM dd')
        const dayNameThree = format(dateThree, 'EEEE, MMM dd')

        const minTempDayOne = Math.floor(response.forecast.forecastday[1].day.mintemp_c)
        const maxTempDayOne = Math.floor(response.forecast.forecastday[1].day.maxtemp_c)

        const minTempDayTwo = Math.floor(response.forecast.forecastday[2].day.mintemp_c)
        const maxTempDayTwo = Math.floor(response.forecast.forecastday[2].day.maxtemp_c)

        const minTempDayThree = Math.floor(response.forecast.forecastday[3].day.mintemp_c)
        const maxTempDayThree = Math.floor(response.forecast.forecastday[3].day.maxtemp_c)

        weatherInfo.innerHTML = `
            <div 
                class="
                    mt-20 
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

                <div 
                    class="
                        w-full 
                        p-3 
                        flex 
                        flex-col 
                        gap-3 
                        mt-10"
                        >
                    <div 
                        class="
                            flex 
                            justify-evenly"
                            >
                        <p>
                            ${dayNameOne}
                        </p>

                        <img src="${dayOneIcon}" class="w-12">

                        <p>
                            min (${minTempDayOne}°C)
                        </p>

                        <p>
                            max (${maxTempDayOne}°C)
                        </p>
                    </div>

                    <div 
                        class="
                            flex
                            justify-evenly"
                            >
                        <p>
                        ${dayNameTwo}
                        </p>

                        <img src="${dayTwoIcon}" class="w-12">

                        <p>
                            min (${minTempDayTwo}°C)
                        </p>

                        <p>
                            max (${maxTempDayTwo}°C)
                        </p>
                    </div>

                    <div 
                        class="
                            flex 
                            justify-evenly"
                            >
                        <p>
                            ${dayNameThree}
                        </p>

                        <img src="${dayThreeIcon}" class="w-12">

                        <p>
                            min (${minTempDayThree}°C)
                        </p>

                        <p>
                            max (${maxTempDayThree}°C)
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

        const formattedDate = format(dateTime, 'EEEE, MMM dd')
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