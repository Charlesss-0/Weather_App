export function renderUi () {
    function bodyBackground () {
        const body = document.querySelector('body')
        const searchForm = document.getElementById('search-form')

        async function searchCity (event) {    
            event.preventDefault()

            const searchInput = document.getElementById('search-input')
            const input = searchInput.value

            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0112e4e65c914c9591532907232608&q=${input}&days=05`, 
            { mode: 'cors' })
            const json = await response.json()
            handleBackgroundColor(json)

            searchForm.reset()
        }
        searchForm.addEventListener('submit', searchCity)

        function handleBackgroundColor (json) {
            const textCondition = json.current.condition.text
            
            if (textCondition.includes('cloudy')) {
                body.className = ''
                body.classList.add('cloudy')

            } else if (textCondition.includes('Sunny')) {
                body.className = ''
                body.classList.add('sunny')

            } else if (textCondition.includes('rain')) {
                body.className = ''
                body.classList.add('rainny')

            } else if (textCondition.includes('Overcast')) {
                body.className = ''
                body.classList.add('overcast')

            } else if (textCondition.includes('Mist')) {
                body.className = ''
                body.classList.add('mist')

            } else if (textCondition.includes('Fog')) {
                body.className = ''
                body.classList.add('fog')

            } else if (textCondition.includes('Clear')) {
                body.className = ''
                body.classList.add('clear')
            }
        }

    }
    bodyBackground()
}