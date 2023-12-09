import { useState } from 'react';
import clear_icon from '../../assets/clear.png';
import cloud_icon from '../../assets/cloud.png';
import drizzle_icon from '../../assets/drizzle.png';
import humidity_icon from '../../assets/humidity.png';
import rain_icon from '../../assets/rain.png';
import search_icon from '../../assets/search.png';
import snow_icon from '../../assets/snow.png';
import wind_icon from '../../assets/wind.png';

import styles from './weather-app.module.scss';

export function WeatherApp() {
  const api_key = '41f584b1c1ff7f518395aa4812896977';

  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementById('city-input') as HTMLInputElement;
    if (element.value === '') {
      return 0;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=metric&appid=${api_key}`;

    const response = await fetch(url);
    const data = await response.json();
    const humidity = document.getElementById('humidity-percent');
    const wind = document.getElementById('wind-rate');
    const temperature = document.getElementById('weather-temp');
    const location = document.getElementById('weather-location');

    humidity!.innerHTML = data.main.humidity + ' %';
    wind!.innerHTML = Math.floor(data.wind.speed) + ' km/h';
    temperature!.innerHTML = Math.floor(data.main.temp) + ' ºC';
    location!.innerHTML = data.name;

    if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
      setWicon(cloud_icon);
    } else if (
      data.weather[0].icon === '03d' ||
      data.weather[0].icon === '03n' ||
      data.weather[0].icon === '04d' ||
      data.weather[0].icon === '04n'
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === '09d' ||
      data.weather[0].icon === '09n' ||
      data.weather[0].icon === '10d' ||
      data.weather[0].icon === '10n'
    ) {
      setWicon(rain_icon);
    } else if (
      data.weather[0].icon === '13d' ||
      data.weather[0].icon === '13n'
    ) {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['top-bar']}>
        <input
          type="text"
          className={styles['city-input']}
          placeholder="Search"
          id="city-input"
        />
        <div
          className={styles['search-icon']}
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="An icon for search." />
        </div>
      </div>
      <div className={styles['weather-image']}>
        <img src={wicon} alt="A cloud icon." />
      </div>
      <div className={styles['weather-temp']} id="weather-temp">
        24°C
      </div>
      <div className={styles['weather-location']} id="weather-location">
        London
      </div>
      <div className={styles['data-container']}>
        <div className={styles['element']}>
          <img
            src={humidity_icon}
            alt="A humidity icon."
            className={styles['icon']}
          />
          <div className={styles['data']}>
            <div className={styles['humidity-percent']} id="humidity-percent">
              64%
            </div>
            <div className={styles['text']}>Humidity</div>
          </div>
        </div>
        <div className={styles['element']}>
          <img src={wind_icon} alt="A wind icon." className={styles['icon']} />
          <div className={styles['data']}>
            <div className={styles['wind-rate']} id="wind-rate">
              18 km/h
            </div>
            <div className={styles['text']}>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
