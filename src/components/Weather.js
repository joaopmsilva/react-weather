import React, { useState, useEffect } from 'react';

import Wrapper from './Wrapper';

import { getWeather } from '../utils/fetchHelpers';

import StyledWeather from './styles/StyledWeather';

const Weather = () => {
  const [inputLocation, setInputLocation] = useState('Lisboa');
  const [currentDate, setCurrentDate] = useState('');
  const [location, setLocation] = useState({
    city: '',
    state: '',
    country: ''
  });
  const [weather, setWeather] = useState({
    currentTemp: 0,
    weatherMain: '',
    tempMax: 0,
    tempMin: 0,
  });

  useEffect(() => {
    fetchData('Lisboa').then(([newWeather, placeName]) => {
      setWeather(newWeather);
      setLocation(placeName);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData(newLocation) {
    const now = new Date();
    setCurrentDate(dateBuilder(now));
    const response = await getWeather(newLocation);
    let weatherIcon = response[0].weatherMain;
    switch(weatherIcon){
      case "Thunderstorm": response[0].weatherMain = <i class='fas fa-bolt fa-3x'></i>;
      break;
      case "Clear": response[0].weatherMain = <i class='fas fa-sun fa-3x'></i>;
      break;
      case "Rain": response[0].weatherMain = <i class='fas fa-cloud-rain fa-3x'></i>;
      break;
      case "Snow": response[0].weatherMain = <i class='fas fa-snowflake fa-3x'></i>;
      break;
      case "Clouds": response[0].weatherMain = <i class='fas fa-cloud-sun fa-3x'></i>;
      break;
      default: response[0].weatherMain = <i class='fas fa-smog fa-3x'></i>;
      break;
    }
    console.log(response);
    return response;
  }

  const setBackground = () => {
    return 'blue';
  }

  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  const handleInputLocation = (e) => {
    e.preventDefault();
    setInputLocation(e.target.value);
  }

  const getForecast = (e) => {
    e.preventDefault();
    fetchData(inputLocation).then(([newWeather, placeName]) => {
      setWeather(newWeather);
      setLocation(placeName);
    });
  }

  return (
    <StyledWeather bgImage={setBackground()}>
      <Wrapper states={{ location, currentDate, weather }} handleInput={handleInputLocation} handleSubmit={getForecast} />
    </StyledWeather>
  );
}

export default Weather;