
import './App.css';
import React, { useState } from 'react';
const api = {
  key: '83e880c1349c77a5c5cf523a5c5ae2cc',
  base:'https://api.openweathermap.org/data/2.5/',
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});


// fetch get request to api URL with given parameters
const search = (e) => {
  if (e.key === 'Enter') {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result)
      });
  }
}


  // Creates today's date
  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // getDay() returns number between 0 - 6 for days of week
    let day = days[d.getDay()];
    let date = d.getDate();
    // returns number between 0 - 11 for months
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    //  if no search query (undefined) set background class to app, > 16 warm background, < 16 cold background (ternary operator)
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 15) ?  'app warm' : 'app') : 'app'}>
        <main>
          <div className='search-box'>
            <input
              type='text'
              className='search-bar'
              placeholder='Search...'
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            ></input>
          </div>
          {/*  if typeof weather is NOT undefined,  */}
          {(typeof weather.main != 'undefined') ? (
          <div>
            <div className='location-box'>
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                  {Math.round(weather.main.temp)}°c
              </div>
              <div className="weather">
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt=""/><br />
                {weather.weather[0].main}
              </div>
            </div>
          </div>
          ) : ('')}
        </main>
    </div>
  );
}

export default App;
