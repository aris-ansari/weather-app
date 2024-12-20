import React, { useState, useEffect, useRef } from "react";

import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.png";
import humidityIcon from "./assets/humidity.png";
import rainIcon from "./assets/rain.png";
import snowIcon from "./assets/snow.png";
import windIcon from "./assets/wind.png";

function Weather() {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();

  const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  async function search(city) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;
      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || clearIcon;
      console.log(icon);
      setWeatherData({
        temprature: Math.floor(data.main.temp),
        location: data.name,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error(error);
    }
  }

  useEffect(() => {
    search("New York");
  }, []);

  return (
    <div className="bg-slate-800 p-8 rounded-lg flex flex-col items-center justify-center">
      <div className="flex justify-between items-center relative">
        <input
          type="text"
          placeholder="Search"
          className="py-3 px-4 mr-4 rounded-full outline-none text-slate-800"
          ref={inputRef}
        />
        <img
          src={searchIcon}
          alt="img"
          className="bg-white p-3 rounded-full cursor-pointer"
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="img" className="w-[180px] my-2" />
          <p className="text-white text-6xl font-semibold mb-2">
            {weatherData.temprature}°c
          </p>
          <p className="text-white text-3xl">{weatherData.location}</p>
          <div className="w-full flex justify-between mt-4">
            <div className="text-center">
              <img src={humidityIcon} alt="img" className="inline-block mb-2" />
              <p className="text-white text-sm">{weatherData.humidity}%</p>
              <p className="text-white text-sm">Humidity</p>
            </div>
            <div className="text-center">
              <img src={windIcon} alt="img" className="inline-block mb-2" />
              <p className="text-white text-sm">{weatherData.wind} km/h</p>
              <p className="text-white text-sm">Wind Speed</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-red-500 mt-6 text-2xl">Data not found</h1>
        </>
      )}
    </div>
  );
}

export default Weather;
