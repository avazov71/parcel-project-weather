import fetchData from './fetchData.js';

export const renderData = cityName => {
  const city = document.getElementById('city');
  const time = document.getElementById('time');
  const date = document.getElementById('date');

  fetchData('current', cityName).then(({ current, location }) => {
    city.textContent = location.name;
    const localTime = location.localtime.split(' ').slice(1).join('');
    const locDate = location.localtime.split(' ')[0];
    const localDate = getDate(locDate);
    time.textContent = localTime;

    city.textContent = location.name;
    time.textContent = localTime;
    date.textContent = localDate;
  });
};

function getDate(info) {
  const date = new Date(info);

  // Опции для форматирования даты
  const options = { weekday: 'long', day: '2-digit', month: 'short' };

  // Форматируем дату
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate;
}

export const renderInfo = cityName => {
  const temp = document.getElementById('temp');
  const feelsLikeTemp = document.getElementById('feels-like');
  const infoIcon = document.getElementById('info__icon');
  const infoTitle = document.getElementById('info__title');
  const humidity = document.getElementById('humidity');
  const wind = document.getElementById('wind');
  const pressure = document.getElementById('pressure');
  const uv = document.getElementById('uv');
  const infoSunrise = document.getElementById('info-sunrise');
  const infoSunset = document.getElementById('info-sunset');

  fetchData('forecast', cityName).then(({ current, forecast }) => {
    const { sunset, sunrise } = forecast.forecastday[0].astro;

    infoIcon.src = current.condition.icon;
    infoTitle.textContent = current.condition.text;
    humidity.textContent = `${current.humidity}%`;
    wind.textContent = `${current.wind_kph}km/h`;
    pressure.textContent = `${current.pressure_mb}hPa`;
    uv.textContent = `${current.uv}`;
    infoSunset.textContent = sunset;
    infoSunrise.textContent = sunrise;

    temp.textContent = current.temp_c;
    feelsLikeTemp.textContent = current.feelslike_c;
  });
};

export const renderForecast = cityName => {
  const list = document.getElementById('hourly-list');

  fetchData('forecast', cityName).then(({ forecast }) => {
    const listHours = forecast.forecastday[0].hour;
    list.innerHTML = '';
    for (let i = 7; i < listHours.length; i += 2) {
      const element = listHours[i];
      const li = document.createElement('li');
      const time = element.time.split(' ')[1];
      const condition = element.condition;

      li.title = condition.text;

      li.innerHTML = `
      <h2>${element.temp_c}°C</h2>
      <h3>${time}</h3>
      <img src="${condition.icon}" alt="${condition.text}"/>
      <p>Облачность: ${element.cloud}%</p>
      `;

      list.appendChild(li);
    }
  });
};

const formSubmit = document.getElementById('form-submit');
const search = event => {
  event.preventDefault();
  const value = formSubmit[1].value;
  renderData(value);
  renderInfo(value);
  renderForecast(value);
  event.target[1].value = '';
};
formSubmit.addEventListener('submit', search);
