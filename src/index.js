import { renderCurrentWeather } from "./main"
import { renderHourly } from "./hourly"
import { renderUi } from "./ui"

const dailyEl = document.getElementById('daily-el')
const hourlyEl = document.getElementById('hourly-el')

renderCurrentWeather()
// renderHourly()
renderUi()

dailyEl.addEventListener('click', renderCurrentWeather)
hourlyEl.addEventListener('click', renderHourly)
