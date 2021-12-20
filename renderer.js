const api = {
  key: "e0d21f9c4c4c1e7209069a7f555da34b",
  url: "https://api.openweathermap.org/data/2.5/"
}

const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('keypress', setQuery);

// setQuery receives an EventListener as parameter and executes the
// getResults function (receiving the searchInput.value as parameter) 
// if the 'keypress' event.keyCode equals 13 (which is the ENTER key code)
function setQuery(event) {

  if (event.keyCode == 13) {
    getResults(searchInput.value);
  }
}

// handleSubmitButtonClick executes the getResults function once the 
// textInput area has a valid city name 
function handleSubmitButtonClick() {
  getResults(searchInput.value);
}

// getResults consumes the API, converts the responses to the JSON format
// and then executes the showResults function
function getResults(query) {
  fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(showResults);
}

// showResults shows the weather, city name and country name results on the screen
function showResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let today = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = buildDate(today);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let climate = document.querySelector('.current .weather');
  climate.innerText = weather.weather[0].main;

  let minMax = document.querySelector('.min-max');
  minMax.innerText = `Min. ${Math.round(weather.main.temp_min)}°c / Max. ${Math.round(weather.main.temp_max)}°c`;
}

// buildDate returns the date in format "week day, date(number), month, year"
function buildDate(d) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}