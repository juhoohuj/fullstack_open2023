import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Country = ({ country }) => {
    const url = `https://studies.cs.helsinki.fi/restcountries/api/name/`
    const API = "377080a829c7f0df00f8dfbd81bca2ff"
    const [countryData, setCountryData] = useState(null)
    const [currcapital, setCurrCapital] = useState("")
    const [coords, setCoords] = useState({lat: null, long: null})
    const [weather, setWeather] = useState(null)

    useEffect(() => {
      fetch(`${url}${country}`)
          .then(response => response.json())
          .then(data => setCountryData(data));
  }, [country]);
  
  useEffect(() => {
      if (countryData) {
          setCurrCapital(countryData.capital[0]);
          setCoords({ lat: countryData.capitalInfo.latlng[0], long: countryData.capitalInfo.latlng[1] });
          console.log("Updated Coords:", coords);
      }
  }, [countryData]);
  
  useEffect(() => {
      let isMounted = true;
  
      if (coords.lat && coords.long) {
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&exclude={current}&appid=${API}&units=metric`)
              .then(response => response.json())
              .then(data => {
                  if (isMounted) {
                      setWeather(data);
                      console.log(data);
                  }
              });
      }
  
      return () => {
          isMounted = false;
      };
  }, [coords]);




    if (!countryData) {
        return null
    }

    const Weather = () => {
        if (!weather) {
            return "Loading..."
        }
        return (
            <div>
                <p>temperature: {weather.main.temp} Celsius</p>
                <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weather icon" />
                <p>wind: {weather.wind.speed} m/s</p>
            </div>
        )
    }


    return (
        <div>
            <h1>{countryData.name.common}</h1>
            <p>capital {countryData.capital[0]}</p>
            <p>area {countryData.area}</p>
            <h2>languages</h2>
            <ul>
                {Object.values(countryData.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={countryData.flags.png} alt="flag" width="200" />
            <h2>Weather in {currcapital}</h2>
            <Weather />
        </div>
    )
}


function App() {
   const url = "https://studies.cs.helsinki.fi/restcountries/api/all/"
   const [countryNames, setCountryNames] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
      fetch(url)
          .then(response => response.json())
          .then(data => setCountryNames(data.map(country => country.name.common)))
    } ,[])


    const handleChange = (event) => {
        setSearch(event.target.value)
    }

    const filteredCountries = countryNames.filter(country => country.toLowerCase().includes(search.toLowerCase())) 
    
    const countriesToShow = () => {
        if (filteredCountries.length > 10) {
            return <p>Too many matches, specify another filter</p>
        }
        if (filteredCountries.length === 1) {
            return <Country country={filteredCountries[0]} />
        }
        return filteredCountries.map(country => <p key={country}>{country} <button  onClick={() => setSearch(country)}>show</button></p> )
    }


  return (
    <div>
      <h1>country lookup</h1>
      <input type="text" value={search} onChange={handleChange} />
      <div>
        <h2>countries</h2>
        {countriesToShow()}
      </div>
    </div>
  )
}

export default App
