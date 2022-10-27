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

//clears local storage 
$('#clearbtn').on('click', function(){
    localStorage.clear()
    searchHistoryEl.innerHTML = ''
})

// add recent searches
for (var i=0; i < searchHistArray.length; i++) {
    // var searchHistBtn = searchHistArray[i];
    // var histBtn = document.createElement('button').setAttribute('class', 'btn btn-success');
    // histBtn.append(searchHistBtn);
    // searchHistoryEl.append(histBtn);
    var searchBtn = $('<button>').addClass('btn btn-success').text(searchHistArray[i]);
    searchHistoryEl.append(searchBtn);
}

// search for city and add search history buttons

$('#searchbtn').on('click', function(e) {
    e.preventDefault()
    var searchInput = $('#cityInput').val();
    var searchBtn = $('<button>').addClass('btn').text(searchInput)
    console.log(searchInput)
    searchHistArray.push(searchInput)
    localStorage.setItem('searchHistArray',JSON.stringify(searchHistArray))
    $('#searchHistory').append(searchBtn)
    getApi(searchInput)
    var searchBtn = $('<button>').addClass('btn btn-success').text(searchHistArray[i]);
    searchHistoryEl.append(searchBtn);
    
})

