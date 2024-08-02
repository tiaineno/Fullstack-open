import axios from 'axios'
import { useEffect, useState } from 'react'

const Results  = ({ results, onClick }) => {
    console.log('moduuli alkaa')
    const [weather, setWeather] = useState(false)

    useEffect(() => {
        console.log('efekti alkaa')
        if (results.length === 1) {
            const apiKey = import.meta.env.VITE_API
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${results[0].capital}&appid=${apiKey}&units=metric`)
                .then(response => {
                    setWeather(response.data)})
        }else{
            setWeather(false)
            console.log('sää poistettu')
        }
      }, [results])

    if (results.length === 1) {
        console.log('ehtolause', weather)
        if (weather === false){
            return (<div>loading</div>)
        }
        console.log('lets go')
        const result = results[0]
        const list = Object.values(result.lang).map(l => <li key={l}>{l}</li>)
        return (
        <div>
            <h1>{result.name}</h1>
            capital {result.capital} <br/>
            area {result.area}
            <h2>languages:</h2>
            <ul>
                {list}
            </ul>
            <img src={result.flag} alt="Flag"></img>
            <h2>Weather in {result.capital}</h2>
            temperature {weather.main.temp} celsius <br/>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="Weather icon"
            width="100" height="100"/> <br/>
            wind {weather.wind.speed} m/s
        </div>
    )}
    else if (results.length<10){
        const lista = results.map(country =>
        <li key={country.name}>
            {country.name} <button onClick={() => onClick(country.name)}>show</button>
        </li>
        )
        return(
        <ul>
            {lista}
        </ul>
        )
    } else {
        return(<div>Too many matches</div>)
    }
}
export default Results