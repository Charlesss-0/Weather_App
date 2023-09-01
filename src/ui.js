export function renderUi () {
    const burgerMenu = document.getElementById('burger-menu')
    const asideContent = document.getElementById('aside-content')
    const mainContent = document.getElementById('main-content')
    const footerContent = document.getElementById('footer-content')
    const currentEl = document.getElementById('current-el')
    const toHourEl = document.getElementById('to-hour')
    const moreOptionsEl = document.getElementById('more-options-el')
    const foreHisEl = document.getElementById('fore-his')
    const todayEl = document.getElementById('today-el')
    const hourlyEl = document.getElementById('hourly-el')
    const forecastEl = document.getElementById('forecast-el')
    const historyEl = document.getElementById('history-el')
    const downArrowOne = document.querySelector('.down-arrow-one')
    const downArrowTwo = document.querySelector('.down-arrow-two')

    burgerMenu.addEventListener('click', hideOptions)
    function hideOptions () {
        asideContent.classList.toggle('translate-left')
    }

    currentEl.addEventListener('click', hideCurrentContent)
    function hideCurrentContent () {
        todayEl.classList.toggle('translate-down')
        hourlyEl.classList.toggle('translate-down')
        moreOptionsEl.classList.toggle('mt-8')
        toHourEl.classList.toggle('height-28')

        const down = 'fi-rr-caret-down'
        const up = 'fi-rr-caret-up'
        
        if (downArrowOne.classList.contains(down)) {
            downArrowOne.classList.remove(down)
            downArrowOne.classList.add(up)

        } else if (downArrowOne.classList.contains(up)) {
            downArrowOne.classList.remove(up)
            downArrowOne.classList.add(down)
        }
    }

    moreOptionsEl.addEventListener('click', hideMoreOptionsContent)
    function hideMoreOptionsContent () {
        forecastEl.classList.toggle('translate-down')
        historyEl.classList.toggle('translate-down')
        foreHisEl.classList.toggle('height-28')

        const down = 'fi-rr-caret-down'
        const up = 'fi-rr-caret-up'

        if (downArrowTwo.classList.contains(down)) {
            downArrowTwo.classList.remove(down)
            downArrowTwo.classList.add(up)

        } else if (downArrowTwo.classList.contains(up)) {
            downArrowTwo.classList.remove(up)
            downArrowTwo.classList.add(down)
        }
    }

    function bodyBackground () {
        async function getWeatherData (position) {
            const body = document.querySelector('body')
            const lat = position.coords.latitude
            const lon = position.coords.longitude
    
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0112e4e65c914c9591532907232608&q=${lat},${lon}&days=05`,
            { mode: 'cors' })
            const json = await response.json()
            const textCondition = json.current.condition.text

            const sunny = 'sunny'
            const cloudy = 'cloudy'

            if (textCondition.includes(cloudy)) {
                body.classList.add('bg-gradient-to-r', 'from-cyan-500', 'to-blue-500')
            }
        }
        const geolocation = navigator.geolocation.getCurrentPosition(getWeatherData)

    }

    bodyBackground()
}