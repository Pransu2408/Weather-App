import React, { useState } from 'react'
import './App.css'

export default function App() {

  const [city,setCity]  = useState('')
  const [weather,setWeather] = useState({});

  const api = {
    key : 'b4784a59d27cec4a62d62016c4da60b1',
    base: 'https://api.openweathermap.org/data/2.5/weather?q='
  }
  const today = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dayOfWeek = dayNames[today.getDay()];
  const dayOfMonth = today.getDate();
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();

  const Searching = (e) =>{

    if(e.key === "Enter"){
      fetch(`${api.base}${city}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setCity('');
        console.log(result)});
    }

  }

  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp >16) ? 'app-warm' : 'app') : 'app'}>
      <main>
    <div className='search-box'>
      <input className='search-bar' type='text' placeholder='Search...' onChange={(e) => setCity(e.target.value)} onKeyPress={Searching} value={city}></input>
    </div>
    {(typeof weather.main != "undefined")?(
    <div>
      <div className='location-box'>
        <div className='location'>
            {weather.name},{weather.sys?.country}
        </div>
        <div className='date'>
        {dayOfWeek} {dayOfMonth} {month} {year}
        </div>
      </div>
      <div className='weather-box'>
        <div className='temp'>
          {Math.round(weather.main.temp)}°c
          </div>
          <div className='weather'>
              {weather.weather[0].main}
          </div>
      </div>
    </div>): (' ')}
    </main>
    </div>
  )
}
