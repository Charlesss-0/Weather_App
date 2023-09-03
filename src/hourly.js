import { format, parseISO } from "date-fns"

export function renderHourly () {
    const body = document.querySelector('body')
    const searchForm = document.getElementById('search-form')
    const searchInput = document.getElementById('search-input')
    const weatherInfo = document.getElementById('weather-info')
    const hourlyInfoEl = document.getElementById('hourly-info')

    async function getPosition (position) {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0112e4e65c914c9591532907232608&q=${lat},${lon}&days=05`,
        { mode: 'cors' })
        const json = await response.json()

        renderHero(json)
        getWeatherData(json)

        searchForm.addEventListener('submit', searchCity)

        async function searchCity (event) {
            event.preventDefault()

            const input = searchInput.value
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0112e4e65c914c9591532907232608&q=${input}&days=05`,
            { mode: 'cors' })
            const json = await response.json()

            renderHero(json)
            getWeatherData(json)

            searchForm.reset()
        }
    }

    function renderHero (data) {
        const city = data.location.name
        const country = data.location.country
        const currentDate = parseISO(data.location.localtime)

        const formattedDate = format(currentDate, 'EEEE, MMM dd')
        
        removeBackground()
        hourlyInfoEl.innerHTML += `
            <h1 class="mt-20 text-2xl">
                Hourly Weather - <span class="text-lg">${city}, ${country}</span>
            </h1>

            <h1 class="text-xl">
                ${formattedDate}
            </h1>
        `
    }

    function getWeatherData (info) {
        const dayOne = info.forecast.forecastday[0].hour
        dayOne.forEach((data) => {
            const currentDate = parseISO(data.time)
            const textCondition = data.condition.text
            const iconCondition = data.condition.icon
            const tempC = parseInt(data.temp_c)
            const feelslikeC = parseInt(data.feelslike_c)
            const windKph = parseInt(data.wind_kph)
            const windDir = data.wind_dir
            const humidity = data.humidity
            const uv = data.uv
            const cloudCover = data.cloud
            const dewPoint = parseInt(data.dewpoint_c)

            const dateTime = new Date(currentDate)
            const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

            const weatherData = `
                <div 
                    class="
                        w-full 
                        flex 
                        items-center
                        cursor-pointer
                        select-none
                        card-header"
                        >
                    <div 
                        class="
                            flex-1 
                            flex 
                            justify-center
                            items-center"
                            >
                        <div class="flex justify-between gap-10 px-10">
                            <p>
                                ${formattedTime}
                            </p>
                            
                            <p>
                                ${tempC}°C
                            </p>
                        </div>

                        <div class="flex-1 flex justify-between px-10">
                            <div class="flex items-center gap-3">
                                <img src="${iconCondition}">
                                <p>
                                    ${textCondition}
                                <p>
                            </div>

                            <div class="flex items-center gap-3 ml-10">
                                <i class="fi fi-rr-wind grid"></i>
                            
                                <span>
                                    ${windDir} ${windKph} km/h
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <i class="fi fi-rr-caret-up down-arrow-two arrow-el flex"></i>
                    </div>
                </div>

                <div
                    class="
                        bg-zinc-950 
                        w-full 
                        rounded-xl 
                        grid
                        items-center
                        h-0
                        p-0
                        overflow-hidden
                        transition-all duration-200 ease-linear
                        card-content-container"
                        >
                    <div class="grid gap-5 translate-top-100 transition-all duration-200 ease-linear card-content">
                        <div class="flex justify-evenly">
                            <div class="flex items-center gap-3">
                                <i class="fi fi-rr-temperature-high grid"></i>
                                <p class="">
                                    Feels Like<br>
                                    ${feelslikeC}°C
                                </p>
                            </div>

                            <div class="flex items-center gap-3">
                                <i class="fi fi-rr-wind grid"></i>
                                <p>
                                    Wind<br>
                                    ${windDir} ${windKph} km/h
                                </p>
                            </div>

                            <div class="flex items-center gap-3">
                                <i class="fi fi-rr-raindrops grid"></i>
                                <p>
                                    Humidity<br>
                                    ${humidity}%
                                </p>
                            </div>
                        </div>

                        <div class="flex justify-evenly">
                            <div class="flex items-center gap-3">
                                <i class="fi fi-rr-sun grid"></i>
                                <p>
                                    UV Index<br>
                                    ${uv} of 11
                                </p>
                            </div>

                            <div class="flex items-center gap-3">
                                <i class="fi fi-rr-cloud grid"></i>
                                <p>
                                    Cloud Cover<br>
                                    ${cloudCover}%
                                </p>
                            </div>

                            <div class="flex items-center gap-3">
                                <i class="fi fi-rr-dewpoint grid"></i>
                                <p>
                                    Dew Point<br>
                                    ${dewPoint}°
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `
            const div = document.createElement('div')
            div.classList.add('w-full', 'px-5', 'py-1', 'flex', 'flex-col', 'items-center', 'justify-center', 'max-w-5xl', 'bg-zinc-900', 'rounded-lg', 'transition-all', 'duration-200', 'ease-linear')
            div.innerHTML = weatherData

            removeBackground()
            hourlyInfoEl.append(div)

            addClickEvent(div)
        })
    }
    
    navigator.geolocation.getCurrentPosition(getPosition)

    function addClickEvent (div) {
        const cardHeader = div.querySelector('.card-header')
        const cardContentContainter = div.querySelector('.card-content-container')
        const cardContent = div.querySelector('.card-content')
        const arrowEl = div.querySelector('.arrow-el')

        cardHeader.addEventListener('click', toggleClass)

        function toggleClass () {
            cardContentContainter.classList.toggle('show-content')
            cardContent.classList.toggle('translate-down')

            div.classList.toggle('pb-4')

            const down = 'fi-rr-caret-down'
            const up = 'fi-rr-caret-up'

            if (arrowEl.classList.contains(up)) {
                arrowEl.classList.remove(up)
                arrowEl.classList.add(down)

            } else if (arrowEl.classList.contains(down)) {
                arrowEl.classList.remove(down)
                arrowEl.classList.add(up)
            }
        }
    }

    function removeBackground () {
        weatherInfo.innerHTML = ''
        body.className = ''
        body.classList.add('bg-neutral-950')
    }
}

