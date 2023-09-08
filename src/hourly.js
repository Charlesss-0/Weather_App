import { getConditionIcon } from "./index"

// It gets exported to index.js module
// Render hourly information
export function getHourlyData (hour, dailyHourly) {
    const condition = hour.condition.text
    const tempC = parseInt(hour.temp_c)
    const humidity = hour.humidity
    const dewpoint = parseInt(hour.dewpoint_c)
    const uvIndex = hour.uv

    const date = hour.time
    const time = new Date(date)
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const div = document.createElement('div')
    div.classList.add('hour-container', 'transition-all', 'duration-500', 'ease-in-out', 'select-none')
    div.innerHTML = `
        <div class="w-32 flex flex-col items-center justify-between gap-5 text-center px-2 py-5 bg-black/50 backdrop-blur rounded-xl [&>*]:text-xs nunito">
            <h1>
                ${formattedTime}
            </h1>

            <img class="icon w-10">

            <p class="text-lg text-center h-12">
                ${condition}
            </p>

            <p>
                ${tempC}°C
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

    const icon = div.querySelector('.icon')
    getConditionIcon(icon, condition, date)
}