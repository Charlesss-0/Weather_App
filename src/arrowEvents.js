// It gets exported to index.js module
// Handles the events on the left and right arrows in hourly information
export function handleArrowClickEvents(dailyHourly) {
    dailyHourly.innerHTML += /* HTML */ `
        <div
            class="absolute top-5 left-2/4 centerX text-lg select-none text-shadow none"
        >
            <h2>Today</h2>
        </div>

        <div
            id="left-container"
            class="
                    absolute 
                    left-0 
                    bottom-0 
                    top-0 
                    w-20 
                    grid 
                    items-center 
                    justify-center
                    none
                    "
        >
            <div
                id="left"
                class="
                        py-6 
                        px-2 
                        rounded-xl 
                        bg-white/50 
                        cursor-pointer 
                        invisible 
                        transition-all 
                        duration-200 
                        ease-in-out
                        "
            >
                <i class="fi fi-rr-angle-left grid text-2xl text-black/80"></i>
            </div>
        </div>

        <div
            id="right-container"
            class="
                    absolute 
                    right-0 
                    bottom-0 
                    top-0 
                    w-20 
                    grid 
                    items-center 
                    justify-center
                    none
                    "
        >
            <div
                id="right"
                class="
                        py-6 
                        px-2 
                        rounded-xl 
                        bg-white/50 
                        cursor-pointer 
                        invisible 
                        transition-all 
                        duration-200 
                        ease-in-out"
            >
                <i class="fi fi-rr-angle-right grid text-2xl text-black/80"></i>
            </div>
        </div>
    `

    const leftContainer = document.getElementById('left-container')
    const rightContainer = document.getElementById('right-container')
    const left = document.getElementById('left')
    const right = document.getElementById('right')

    left.addEventListener('click', handleLeftArrowClick)
    right.addEventListener('click', handleRightArrowClick)

    leftContainer.addEventListener('mouseover', () => {
        left.classList.add('show')
        leftContainer.addEventListener('mouseleave', () => {
            left.classList.remove('show')
        })
    })

    rightContainer.addEventListener('mouseover', () => {
        right.classList.add('show')
        rightContainer.addEventListener('mouseleave', () => {
            right.classList.remove('show')
        })
    })

    const hourContainer = document.querySelectorAll('.hour-container')
    let scrollPosition = 0
    const scrollAmount = 673.8
    const maxScroll = dailyHourly.scrollWidth - dailyHourly.offsetWidth

    function handleLeftArrowClick() {
        if (scrollPosition > 0) {
            scrollPosition -= scrollAmount

            if (scrollPosition < 0) {
                scrollPosition = 0
            }

            hourContainer.forEach((hour) => {
                hour.style.transform = `translateX(-${scrollPosition}px)`
            })
        }
    }

    function handleRightArrowClick() {
        if (scrollPosition < maxScroll) {
            scrollPosition += scrollAmount

            if (scrollPosition > maxScroll) {
                scrollPosition = maxScroll
            }

            hourContainer.forEach((hour) => {
                hour.style.transform = `translateX(-${scrollPosition}px)`
            })
        }
    }
}
