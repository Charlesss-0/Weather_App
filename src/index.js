fetch('https://api.weatherapi.com/v1/current.json?key=0112e4e65c914c9591532907232608&q=juigalpa')
    .then(response => response.json())
    .then(console.log)