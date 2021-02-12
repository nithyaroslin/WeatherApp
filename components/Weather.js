import React,{useState, useEffect} from 'react'

function Weather() {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        fetch("http://api.openweathermap.org/data/2.5/weather?q=south portland&appid=10379ab80c610c632de76cb22f5fa16a")
        .then(res => res.json())
        .then(res => {
            //console.log(res)
            setWeatherData(res)
            
        })
        
    }, [])
    return (
        <div>
            <h2>Weather App</h2>
            {  weatherData ?
            <>
                {/* <h4>Weather Data found</h4> */}
                <p>Longitute : {weatherData["coord"]["lon"]}</p>
                <p>Latitude  : {weatherData["coord"]["lon"]}</p>
            </>
            : 
             <h4>Weather data Loading....</h4>
            }
           
        </div>
    )
}

export default Weather
