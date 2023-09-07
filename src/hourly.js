export function getHourlyData (hour, dailyHourly) {
    const date = hour.time
    const icon = hour.condition.icon
    const tempC = parseInt(hour.temp_c)
    const humidity = hour.humidity
    const dewpoint = parseInt(hour.dewpoint_c)
    const uvIndex = hour.uv
    const windSpeed = parseInt(hour.wind_kph)

    const time = new Date(date)
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const div = document.createElement('div')
    div.classList.add('hour-container', 'transition-all', 'duration-500', 'ease-in-out', 'select-none')
    div.innerHTML = `
        <div 
            class="
                w-32 
                grid 
                justify-center 
                gap-5 
                text-center 
                py-5 
                bg-black/50 
                backdrop-blur 
                rounded-xl 
                [&>*]:text-xs
                nunito"
                >
            <h1>
                ${formattedTime}
            </h1>

            <img src="${icon}">

            <p>
                ${tempC}°C
            </p>

            <p>
                Wind Speed<br>
                <span class="flex justify-center items-center gap-2">
                    <i class="fi fi-rr-wind grid"></i>
                    ${windSpeed} km/h
                </span>
            </p>

            <p>
                Humidity<br>
                <span class="flex justify-center items-center gap-2">
                    <i class="fi fi-rr-raindrops grid"></i>
                    ${humidity}%
                </span>
            </p>

            <p>
                Dew Point<br>
                <span class="flex justify-center items-center gap-2">
                    <i class="fi fi-rr-dewpoint grid"></i>
                    ${dewpoint}°
                </span>
            </p>

            <p>
                UV Index<br>
                <span class="flex justify-center items-center gap-2">
                    <i class="fi fi-rr-sun grid"></i>
                    ${uvIndex} of 11
                </span>
            </p>
        </div>
    `
    dailyHourly.appendChild(div)
}