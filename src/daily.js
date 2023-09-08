import { format, parseISO } from "date-fns"

// It gets exported to index.js module
// Renders daily information
export function getDailyData (day, dailyHourly) {
    const condition = day.day.condition.text
    const icon = day.day.condition.icon
    const maxTemp = parseInt(day.day.maxtemp_c)
    const minTemp = parseInt(day.day.mintemp_c)
    const date = parseISO(day.date)
    const formattedDate = format(date, 'EEE, MMM dd')

    const div = document.createElement('div')
    div.innerHTML = `
        <div class="nunito text-sm bg-black/50 backdrop-blur w-32 h-96 flex flex-col justify-between items-center p-2 py-5 rounded-xl select-none">
            <p>
                ${formattedDate}
            </p>

            <img src="${icon}" class="w-12">

            <p class="text-sm text-center h-16">
                ${condition}
            </p>

            <p class="warm">
                ${maxTemp}°C
            </p>

            <div class="w-5 h-32 rounded-2xl custom-gradient"></div>

            <p class="cool">
                ${minTemp}°C
            </p>
        </div>
    `
    dailyHourly.appendChild(div)
}