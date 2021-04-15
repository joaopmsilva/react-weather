import React from 'react';

import StyledWeatherDisplay from './styles/StyledWeatherDisplay';

const WeatherDisplay = ({ weather: { currentTemp, weatherMain, tempMax, tempMin } }) => (
  <StyledWeatherDisplay>
    <h1>{Math.round(currentTemp)}<span>&#186;C</span> </h1>
    <h2>Weather: {weatherMain}</h2>
    <h3>Min: {Math.round(tempMin)}&#186;C / Max: {Math.round(tempMax)}&#186;C</h3>
  </StyledWeatherDisplay>
);

export default WeatherDisplay;