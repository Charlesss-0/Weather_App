export function renderUi () {
    const burgerMenu = document.getElementById('burger-menu')
    const asideContent = document.getElementById('aside-content')
    const mainContent = document.getElementById('main-content')
    const footerContent = document.getElementById('footer-content')
    const currentEl = document.getElementById('current-el')
    const toHourEl = document.getElementById('to-hour')
    const moreOptionsEl = document.getElementById('more-options-el')
    const foreHisEl = document.getElementById('fore-his')
    const nowEl = document.getElementById('now-el')
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
        nowEl.classList.toggle('translate-down')
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
        const body = document.querySelector('body')
        const searchForm = document.getElementById('search-form')

        const sunny = 'Sunny'
        const rainny = 'rain'
        const cloudy = 'cloudy'
        const overcast = 'Overcast'
        const mist = 'Mist'
        const clear = 'Clear'

        async function searchCity () {    
            const searchInput = document.getElementById('search-input')
            const input = searchInput.value

            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0112e4e65c914c9591532907232608&q=${input}&days=05`, 
            { mode: 'cors' })
            const json = await response.json()
            const textCondition = json.current.condition.text
            
            if (textCondition.includes(cloudy)) {
                body.className = ''
                body.classList.add('cloudy-gradient')

            } else if (textCondition.includes(sunny)) {
                body.className = ''
                body.classList.add('sunny-gradient')

            } else if (textCondition.includes(rainny)) {
                body.className = ''
                body.classList.add('rainny-gradient')

            } else if (textCondition.includes(overcast)) {
                body.className = ''
                body.classList.add('overcast')

            } else if (textCondition.includes(mist)) {
                body.className = ''
                body.classList.add('mist-gradient')
            }
        }
        searchForm.addEventListener('submit', searchCity)

    }
    bodyBackground()
}