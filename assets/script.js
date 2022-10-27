var apiKey = '98dab0374d715d8b0802f2824300c3e2';
var dateEl = $('#date');
var cityEl = $('#city');
var currentTempEl = $('#currentTemp');
var currentFeelsEl = $('#currentFeels');
var currentHumidityEl = $('#currentHumidity');
var currentWindEl = $('#currentWind');
var weatherIconEl = $('#weatherIcon');
var searchHistoryEl = $('.searchHistory')
// var searchHistArray = [];
var searchHistArray = JSON.parse(localStorage.getItem('searchHistArray'))||[];


var api = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}';

// display current date
let currentDate = moment().format('L');
function displayCurrentDate() {
    dateEl.text(currentDate);
};

displayCurrentDate(currentDate);

