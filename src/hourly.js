export function renderHourly () {
    const body = document.querySelector('body')
    const weatherInfo = document.getElementById('weather-info')
    const hourlyInfoEl = document.getElementById('hourly-info')

    async function getWeatherData (position) {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0112e4e65c914c9591532907232608&q=${lat},${lon}&days=05`,
        { mode: 'cors' })
        const json = await response.json()
        const dayOne = json.forecast.forecastday[0].hour
        console.log(dayOne)
        dayOne.forEach((e) => {
            const dateTime = e.time
            const textCondition = e.condition.text
            const iconCondition = e.condition.icon
            const tempC = Math.floor(e.temp_c)

            const weatherData = `
                <p>
                    ${dateTime}
                </p>
                    ${tempC}°C
                <p>

                </p>

                <p>
                    ${textCondition}
                <p>

                <img src="${iconCondition}" class="">
            `

            const divContainer = document.createElement('div')
            divContainer.classList.add('margin-top-first', 'flex', 'justify-evenly', 'items-center')
            divContainer.innerHTML = weatherData

            removeBackground()
            hourlyInfoEl.appendChild(divContainer)
        })
    }
    navigator.geolocation.getCurrentPosition(getWeatherData)

    function removeBackground () {
        weatherInfo.innerHTML = ''
        body.className = ''
        body.classList.add('bg-neutral-950')
    }
}