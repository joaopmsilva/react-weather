import React from 'react';

import StyledWeatherDisplay from './styles/StyledWeatherDisplay';

const WeatherDisplay = ({ weather: { currentTemp, weatherMain, tempMax, tempMin } }) => (
  <StyledWeatherDisplay>
    <script src="https://kit.fontawesome.com/c3bc2f5af9.js" crossorigin="anonymous"></script>
    <h1>{Math.round(currentTemp)}<span>&#186;C</span> </h1>
    {weatherMain}
    <h3>{Math.round(tempMin)}&#186;C / {Math.round(tempMax)}&#186;C</h3>
  </StyledWeatherDisplay>
);

export default WeatherDisplay;