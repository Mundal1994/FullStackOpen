import { useState, useEffect } from 'react'
import axios from 'axios'

/*  Displays weather data */

const WeatherData = (props) => {
  if (props.weather)
  {
    const image = 'http://openweathermap.org/img/wn/' + props.weather.weather[0].icon + '@2x.png'
    return (
      <div>
        <p>temperature {JSON.stringify(props.weather.main.temp)} Celcius</p>
        <img src={image} alt={props.weather.weather[0].description}></img>
        <p>wind {JSON.stringify(props.weather.wind.speed)} m/s</p>
      </div>
    )
  }
}

/*  Get the correct weather data */

const Weather = (props) => {
  if (!props.weather || props.capital[0] !== props.weather.name)
  {
    const api_key = process.env.REACT_APP_API_KEY
    axios
    .get('https://api.openweathermap.org/data/2.5/weather?q=' + props.capital[0] + '&units=metric&appid=' + api_key)
    .then(response => {
      props.handleWeather(response.data)
    })
  }
  return (
    <div>
      <h2>Weather in {props.capital}</h2>
      <WeatherData weather={props.weather}/>
    </div>
  )
}

/*   Display the languages to the browser */

const Languages = (props) => {
  return (
  <ul>
    {Object.keys(props.lang).map((key, index) => (
        <li key={index}>{props.lang[key]}</li>
    ))}
  </ul>
)}

/*  Info about the country */

const CountryInfo = (props) => (
  <div>
    <h2>{props.country.name.common}</h2>
    <p>capital {props.country.capital}</p>
    <p>area {props.country.area}</p>
    <h3>languages:</h3>
    <Languages lang={props.country.languages}/>
    <img src={props.country.flags.png} alt={props.country.name.common}></img>
    <Weather capital={props.country.capital} weather={props.weather} handleWeather={props.handleWeather}/>
  </div>
)

/*  Prints to the browser the countries and has a button that will show info about a country if pressed */

const Country = (props) => {
  return (
    <p>{props.country.name.common} <button onClick={() => props.handleEvent(props.country.name.common)}>Show</button></p>
  )}

/*  Displays a filtered list of the countries */

const Countries = (props) => {
  const countryCount = props.newList.length;
  console.log(props.newList)
  if (countryCount > 10)
    return (<p>Too many matches, specify another filter</p>)
  else if (countryCount === 1)
    return (<CountryInfo country={props.newList[0]} weather={props.weather} handleWeather={props.handleWeather}/>)
  else
  {
    return (
      <ul>
        {props.newList.map(country =>
          <Country key={country.name.common} country={country} handleEvent={props.handleEvent}/>
        )}
      </ul>
    )
  }
}

/*  Takes care of the logic of registrering what to filter by */

const Filter = (props) => (
  <div>
    find countries <input 
    value={props.filterBy} 
    onChange={props.handleFilterChange}
    />
  </div>
)

/*  Core logic and defined functions */

const App = () => {
  const [countries, setCountries] = useState([])
  const [newList, setNewList] = useState([])
  const [filterBy, setFilterBy] = useState('')
  const [weather, setWeather] = useState([])
  
  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
      setNewList(response.data)
      console.log(response.data)
      var weather
      setWeather(weather)
    })
  }, [])

  const showList = (str, countriesList) => {
    if (str === '')
      setNewList(countriesList)
    else
      setNewList(countriesList.filter(person => person.name.common.toLowerCase().includes(str.toLowerCase())))
  }

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value)
    showList(event.target.value, countries)
  }

  const handleEvent = (name, weather) => {
    var tempList = newList.filter(country => country.name.common.includes(name))
    setNewList(tempList)
  }

  const handleWeather = (weather) => {
    setWeather(weather)
  }

  return (
    <div>
      <Filter filterBy={filterBy} handleFilterChange={handleFilterChange}/>
      <Countries newList={newList} handleEvent={handleEvent} weather={weather} handleWeather={handleWeather}/>
    </div>
  )
}

export default App
