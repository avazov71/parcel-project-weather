export default changeMode = () => {
  const mode = document.querySelector('.js-forecast');
  const circle = document.querySelector('.forecast__circle');
  const modeText = document.querySelector('#js-light');

  mode.classList.toggle('dark-mode');
  circle.classList.toggle('forecast__dark');

  if (mode.classList.contains('dark-mode')) {
    modeText.textContent = 'Dark Mode';
    document.body.style.color = '#fff';
  } else {
    modeText.textContent = 'Light Mode';
    document.body.style.color = '#000';
  }
};
