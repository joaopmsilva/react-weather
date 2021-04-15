const MAPBOX_BASE = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const WEATHER_BASE = 'https://api.openweathermap.org/data/2.5/onecall';

const getGeocode = async (location) => {
  const URL = `${MAPBOX_BASE}${location}.json?types=place&access_token=pk.eyJ1IjoiZ2RrcGFyYWRveCIsImEiOiJja25pcXQ0cnMwY2MxMnFwOGJxYW5jdW5xIn0.1Vuj80WTzqdRvl56RiktSg`;

  const geocodeList = await fetch(URL)
    .then(data => data.json())
    .then(result => result.features);

  const coordinates = geocodeList[0].center;
  const placeName = geocodeList[0].matching_text ? geocodeList[0].matching_text : geocodeList[0].text;

  const state = geocodeList[0].context[0].text;
  const country = geocodeList[0].context[1].text;
  return { coordinates, placeName, state, country };
}

export const getWeather = async (location) => {
  const geocodeResult = await getGeocode(location);
  const [lon, lat] = geocodeResult.coordinates;
  const placeName = {
    city: geocodeResult.placeName.split(/\b\s[Ss]hi\b/)[0],
    state: geocodeResult.state,
    country: geocodeResult.country
  }


  const URL = `${WEATHER_BASE}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=a88a5bcfd62d1b1f09c50eb65f78aa7d`;

  const weatherResult = await fetch(URL).then(data => data.json()).then(result => result);

  const currentTemp = weatherResult.current.temp;
  const todayWeather = weatherResult.daily[0];
  const weatherMain = todayWeather.weather[0].main;
  const tempMax = todayWeather.temp.max;
  const tempMin = todayWeather.temp.min;

  return [{ currentTemp, weatherMain, tempMax, tempMin }, placeName];
  
}