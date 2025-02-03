import fetchData from './js/fetchData.js';
import changeMode from './js/changeMode.js';
import { renderData, renderInfo, renderForecast } from './js/renderData.js';
const loader = document.getElementById('loader');
const forecast = document.querySelector('.js-forecast');

loader.hidden = false;
forecast.hidden = true;
setTimeout(() => {
  renderData('Jalal-Abad');
  renderInfo('Jalal-Abad');
  renderForecast('Jalal-Abad');
  loader.hidden = true;
  forecast.hidden = false;
}, 1000);
