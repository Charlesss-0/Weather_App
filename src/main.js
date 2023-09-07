import { format, parseISO } from "date-fns"
import { getDailyData } from "./daily"
import { getHourlyData } from "./hourly"

export function renderCurrentWeather () {
    const body = document.querySelector('body')
    const weatherInfo = document.getElementById('weather-info')
    const searchForm = document.getElementById('search-form')
    const searchInput = document.getElementById('search-input')

    async function getWeatherData (position) {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0112e4e65c914c9591532907232608&q=${lat},${lon}&days=8`,
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

        weatherInfo.innerHTML = `
            <div class="mt-24 h-full flex flex-col gap-8">
                <div class="flex justify-evenly gap-12 w-9/12 m-auto p-10 rounded-3xl bg-black/50 backdrop-blur">
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
                                <i class="fi fi-rr-wind grid"></i>
                                
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

                <div class="flex justify-center gap-5 w-11/12 m-auto p-2">
                    <h2 id="daily" class="bg-black/50 p-2 px-5 rounded-lg cursor-pointer select-none">
                        Daily
                    </h2>

                    <div class="border-left"></div>

                    <h2 id="hourly" class="bg-black/50 p-2 px-5 rounded-lg cursor-pointer select-none">
                        Hourly
                    </h2>
                </div>

                <div id="daily-hourly" class="w-11/12 px-12 py-5 flex gap-10 m-auto overflow-auto no-scrollbar relative"></div>
            </div>
        `

        const location = document.getElementById('location')
        location.innerHTML = `
            <h1 class="text-2xl font-semibold">
                ${city}, ${region}, ${country}
            </h1>
        `

        switchDailyHourly(response)
    }

    function switchDailyHourly (response) {
        const dailyHourlyEl = document.getElementById('daily-hourly')
        const daily = document.getElementById('daily')
        const hourly = document.getElementById('hourly')

        renderDailyWeather()
        // renderHourlyWeather()

        daily.addEventListener('click', renderDailyWeather)
        hourly.addEventListener('click', renderHourlyWeather)

        function renderDailyWeather () {
            const dailyData = response.forecast.forecastday
            dailyHourlyEl.innerHTML = ''
            dailyHourlyEl.classList.add('justify-center')
            dailyData.forEach((day) => getDailyData(day, dailyHourlyEl))
        }

        function renderHourlyWeather () {
            const hourlyData = response.forecast.forecastday[0].hour
            dailyHourlyEl.innerHTML = ''
            dailyHourlyEl.classList.remove('justify-center')
            hourlyData.forEach((hour) => getHourlyData(hour, dailyHourlyEl))
            dailyHourlyEl.innerHTML += `
                <div id="left-container"
                    class="
                        absolute 
                        left-0 
                        bottom-0 
                        top-0 
                        w-20 
                        grid 
                        items-center 
                        justify-center"
                        >
                    <div id="left" class="bg-black/50 py-6 px-2 rounded-xl bg-white/50 cursor-pointer invisible transition-all duration-200 ease-in-out">
                        <i class="fi fi-rr-angle-left grid text-2xl text-black/80"></i>
                    </div>
                </div>

                <div id="right-container"
                    class="
                        absolute 
                        right-0 
                        bottom-0 
                        top-0 
                        w-20 
                        grid 
                        items-center 
                        justify-center"
                        >
                    <div id="right" class="bg-black/50 py-6 px-2 rounded-xl bg-white/50 cursor-pointer invisible transition-all duration-200 ease-in-out">
                        <i class="fi fi-rr-angle-right grid text-2xl text-black/80"></i>
                    </div>
                </div>
            `

            const leftContainer = document.getElementById('left-container')
            const rightContainer = document.getElementById('right-container')
            const left = document.getElementById('left')
            const right = document.getElementById('right')

            left.addEventListener('click', handleLeftArrowClick)
            right.addEventListener('click', handleRightArrowClick)

            leftContainer.addEventListener('mouseover', () => {
                left.classList.add('show')

                leftContainer.addEventListener('mouseleave', () => {
                    left.classList.remove('show')
                })
            })

            rightContainer.addEventListener('mouseover', () => {
                right.classList.add('show')

                rightContainer.addEventListener('mouseleave', () => {
                    right.classList.remove('show')
                })
            })

            const hourContainer = document.querySelectorAll('.hour-container')
            let scrollPosition = 0
            const scrollAmount = 673.8
            const maxScroll = dailyHourlyEl.scrollWidth - dailyHourlyEl.offsetWidth
    
            function handleLeftArrowClick () {
                if (scrollPosition > 0) {
                    scrollPosition -= scrollAmount
    
                    if (scrollPosition < 0) {
                        scrollPosition = 0
                    }
        
                    hourContainer.forEach((hour) => {
                        hour.style.transform = `translateX(-${scrollPosition}px)`
                    })
                }
            }
        
            function handleRightArrowClick () {    
                if (scrollPosition < maxScroll) {
                    scrollPosition += scrollAmount
    
                    if (scrollPosition > maxScroll) {
                        scrollPosition = maxScroll
                    }
        
                    hourContainer.forEach((hour) => {
                        hour.style.transform = `translateX(-${scrollPosition}px)`
                    })
                }
            }
        }
    }

    async function renderCurrentTime (lat, lon) {
        const response = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=FB9X38BQ1RT7&format=json&by=position&lat=${lat}&lng=${lon}`, 
        { mode: 'cors' })
        const json = await response.json()
        getCurrentTime(json)
    }

    function getCurrentTime (response) {
        const currentTime = document.getElementById('time')
        const dateTimeString = response.formatted
        const time = new Date(dateTimeString)
        const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        currentTime.innerHTML = `
            <p class="text-center">
                Time
            </p>

            <p>
                ${formattedTime}
            </p>
        `
    }

    function handleBackgroundColor (json) {    
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

    searchForm.addEventListener('submit', searchCity)

    async function searchCity (event) {
        event.preventDefault()

        const input = searchInput.value
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0112e4e65c914c9591532907232608&q=${input}&days=08`,
        { mode: 'cors' })
        const json = await response.json()
        const lat = json.location.lat
        const lon = json.location.lon

        weatherInfo.innerHTML = ''
        renderWeather(json)
        renderCurrentTime(lat, lon)

        searchForm.reset()
    }
}