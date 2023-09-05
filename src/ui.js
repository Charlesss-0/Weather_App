export function renderUi () {
    const dailyEl = document.getElementById('daily-el')
    const hourlyEl = document.getElementById('hourly-el')

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
                body.classList.add('cloudy')

            } else if (textCondition.includes(sunny)) {
                body.className = ''
                body.classList.add('sunny')

            } else if (textCondition.includes(rainny)) {
                body.className = ''
                body.classList.add('rainny')

            } else if (textCondition.includes(overcast)) {
                body.className = ''
                body.classList.add('overcast')

            } else if (textCondition.includes(mist)) {
                body.className = ''
                body.classList.add('mist')
            } else if (textCondition.includes(clear)) {
                body.className = ''
                body.classList.add('clear')
            }
        }
        searchForm.addEventListener('submit', searchCity)

    }
    bodyBackground()
    
    dailyEl.addEventListener('click', () => {
        hourlyEl.classList.add('text-zinc-200')
        hourlyEl.classList.remove('bg-zinc-200')
        dailyEl.classList.remove('text-zinc-200')
        dailyEl.classList.add('bg-zinc-200', 'text-gray-900')
    })

    hourlyEl.addEventListener('click', () => {
        dailyEl.classList.add('text-zinc-200')
        dailyEl.classList.remove('bg-zinc-200')
        hourlyEl.classList.remove('text-zinc-200')
        hourlyEl.classList.add('bg-zinc-200', 'text-gray-900')
    })
}