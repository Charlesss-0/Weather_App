import { format, parseISO } from "date-fns"
import { switchDailyHourly } from "./index"
import { getConditionIcon } from "./index"

// It gets exported to index.js module
// Renders weather information for the current position or any searched city
export function renderWeather (response) {
    const weatherInfo = document.getElementById('weather-info')

    const textCondition = response.current.condition.text
    const tempC = parseInt(response.current.temp_c)
    const feelslikeC = parseInt(response.current.feelslike_c)
    const windSpeed =  parseInt(response.current.wind_kph)
    const humidity = response.current.humidity
    const uvIndex = response.current.uv
    const cloud = response.current.cloud
    const sunrise = response.forecast.forecastday[0].astro.sunrise
    const sunset = response.forecast.forecastday[0].astro.sunset
    const currentDate = parseISO(response.forecast.forecastday[0].date)
    const formattedDate = format(currentDate, 'EEEE dd MMMM')

    weatherInfo.innerHTML = `
        <div class="mt-24 h-full flex flex-col">
            <div 
                class="
                    flex 
                    justify-evenly 
                    gap-12 
                    w-11/12 
                    m-auto 
                    mb-10 
                    p-10 
                    rounded-3xl 
                    bg-black/50 
                    backdrop-blur 
                    weather
                    ">
                <div class="grid items-center justify-items-center">
                    <img class="icon w-20">

                    <p class="text-lg">
                        ${textCondition}
                    </p>
                </div>

                <div class="text-lg grid p-2">
                    <h2>
                        ${formattedDate}
                    </h2>

                    <div class="grid gap-1 text-4xl mt-5 text-center-sm">
                        <p class="font-semibold">${tempC}°C</p>

                        <div class="flex items-center gap-2 text-lg">
                            <i class="fi fi-rr-temperature-high flex text-lg"></i>
                            <p>
                                Feels Like ${feelslikeC}°
                            </p>
                        </div>
                    </div>
                </div>

                <div class="grid text-sm">
                    <h2 class="text-center">
                        More Details:
                    </h2>

                    <div class="nunito grid grid-cols-2 gap-x-10 gap-y-5 mt-5 [&>*]:flex [&>*]:items-center [&>*]:gap-2">
                        <div>
                            <i class="fi fi-rr-wind grid"></i>
                            
                            <p>
                                Wind Speed<br>
                                ${windSpeed} km/h
                            </p>
                        </div>

                        <div>
                            <i class="fi fi-rr-raindrops grid"></i>

                            <p>
                                Air Humidity<br> 
                                ${humidity}%
                            </p>
                        </div>

                        <div>
                            <i class="fi fi-rr-sun grid"></i>

                            <p>
                                UV Index<br>
                                ${uvIndex} of 11
                            </p>
                        </div>

                        <div>
                            <i class="fi fi-rr-cloud grid"></i>

                            <p>
                                Cloud Cover<br> 
                                ${cloud}%
                            </p>
                        </div>
                    </div>
                </div>

                <div class="nunito flex items-center gap-10 p-3 [&>*]:grid [&>*]:justify-items-center [&>*]:text-sm sm-justify-center">
                    <div>
                        <i class="fi fi-rr-sunrise-alt grid"></i>
                        <p>
                            ${sunrise}
                        </p>
                        <p>
                            Sunrise
                        </p>
                    </div>

                    <div>
                        <i class="fi fi-rr-sunset grid"></i>
                        <p>
                            ${sunset}
                        </p>
                        <p>
                            Sunset
                        </p>
                    </div>
                </div>

            </div>

            <div class="flex justify-center w-11/12 m-auto p-2 text-shadow [&>*]:select-none [&>*]:text-lg [&>*]:font-semibold">
                <div class="flex rounded-lg font-size-lg">
                    <h2 id="daily" class="p-2 px-5 rounded-s-lg cursor-pointer w-24 flex justify-center transition-all duration-200 ease-linear">
                        Daily
                    </h2>

                    <div class="border-left"></div>

                    <h2 id="hourly" class="p-2 px-5 rounded-e-lg cursor-pointer w-24 flex justify-center transition-all duration-200 ease-linear">
                        Hourly
                    </h2>
                </div>
            </div>

            <div id="daily-hourly" class="w-11/12 px-12 py-5 pt-20 flex gap-10 m-auto overflow-hidden no-scrollbar relative forecast-container"></div>
        </div>
    `
    switchDailyHourly(response)

    const iconCondition = response.current.condition.icon

    const img = document.querySelector('.icon')
    getConditionIcon(img, iconCondition)
}