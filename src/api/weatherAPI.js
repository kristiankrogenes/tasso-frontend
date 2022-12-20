
export async function fetchWeatherFromLonLat(lat, lon) {
    console.log("Weather API Button pressed.");
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8439f2c686msh5be5ec9832816e9p1b0a26jsn626db053cb50',
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
    };
    
    const weatherResponse = await fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${lat}&lon=${lon}`, options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));

    const cleanedWeatherData = [];
    let currentDate = "";
    for (let i=0; i<weatherResponse.data.length; i++) {
        let newDate = false;
        if (currentDate !== weatherResponse.data[i].datetime.slice(0, 10)) {
            newDate = true;
            currentDate = weatherResponse.data[i].datetime.slice(0, 10);
        }
        cleanedWeatherData.push({
            id_key: i,
            date: weatherResponse.data[i].datetime,
            icon: weatherResponse.data[i].weather.icon,
            temp: weatherResponse.data[i].temp,
            precip: weatherResponse.data[i].precip.toFixed(2),
            wind_speed: weatherResponse.data[i].wind_spd.toFixed(1),
            wind_gust_speed: weatherResponse.data[i].wind_gust_spd.toFixed(1),
            wind_direction: weatherResponse.data[i].wind_cdir,
            weather_description: weatherResponse.data[i].weather.description,
            isNewDate: newDate
        })
    }
    return cleanedWeatherData;
}