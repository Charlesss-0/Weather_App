import { format, parseISO } from "date-fns"

export function getDailyData (day, dailyHourly) {
    const date = parseISO(day.date)
    const icon = day.day.condition.icon
    const maxTemp = parseInt(day.day.maxtemp_c)
    const minTemp = parseInt(day.day.mintemp_c)
    const formattedDate = format(date, 'EEE, MMM dd')

    const div = document.createElement('div')
    div.innerHTML = `
        <div 
            class="
                nunito 
                text-sm 
                bg-black/50 
                backdrop-blur 
                w-32 
                grid 
                justify-items-center 
                gap-5 
                p-2 
                py-5 
                rounded-xl
                select-none"
                >
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
    dailyHourly.appendChild(div)
}