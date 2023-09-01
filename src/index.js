import { renderCurrentWeather } from "./main"
import { renderHourly } from "./hourly"
import { renderUi } from "./ui"

const nowEl = document.getElementById('now-el')
const hourlyEl = document.getElementById('hourly-el')

renderCurrentWeather()
// renderHourly()
renderUi()

nowEl.addEventListener('click', renderCurrentWeather)
hourlyEl.addEventListener('click', renderHourly)
