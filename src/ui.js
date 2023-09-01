export function renderUi () {
    const burgerMenu = document.getElementById('burger-menu')
    const asideContent = document.getElementById('aside-content')
    const mainContent = document.getElementById('main-content')
    const footerContent = document.getElementById('footer-content')
    const currentEl = document.getElementById('current-el')
    const currentElChild = document.getElementById('current-el-child')
    const moreOptionsEl = document.getElementById('more-options-el')
    const todayEl = document.getElementById('today-el')
    const hourlyEl = document.getElementById('hourly-el')
    const forecastEl = document.getElementById('forecast-el')
    const historyEl = document.getElementById('history-el')
    const downArrowOne = document.querySelector('.down-arrow-one')
    const downArrowTwo = document.querySelector('.down-arrow-two')

    burgerMenu.addEventListener('click', hideOptions)
    function hideOptions () {
        asideContent.classList.toggle('translate-left')
        mainContent.classList.toggle('margin-left-none')
        footerContent.classList.toggle('margin-left-none')
    }

    currentEl.addEventListener('click', hideCurrentContent)
    function hideCurrentContent () {
        todayEl.classList.toggle('translate-top')
        hourlyEl.classList.toggle('translate-top')
        moreOptionsEl.classList.toggle('margin-top-none')
        currentElChild.classList.toggle('height-none')

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
        forecastEl.classList.toggle('translate-top')
        historyEl.classList.toggle('translate-top')

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
}