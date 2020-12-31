import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./styles/App.css";


function App() {

  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=London`)
    .then((data) => {
      setWeather(data.data);
    })
    .catch((err) => console.log(err));
  },[]);

  const weatherInput = (e) => {
    setInput(e.target.value);
  };

  const searchWeather = () => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${input}`)
    .then((data) => {
      setWeather(data.data);
    })
  };

  return (
    <div>
      {weather && (
        <div className="weather-container">
          <h1 id="title">Weather App</h1>
          <div className="search">
            <input placeholder="Location" onChange={weatherInput} type="text"/>
            <button onClick={searchWeather} >Search</button>
          </div>
          <div className="weather-info">
            <h1>{weather.location.name}</h1>
            <h2>{weather.location.country}</h2>
            <div className="condition">
              <h3>{weather.current.condition.text}</h3>
              <div className="degrees-text">
                <h3>{weather.current.temp_c}°C</h3>
                <img className="weather-icon" src={weather.current.condition.icon} alt="weather icon"/>
              </div>              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

