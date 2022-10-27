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

// get coordinates for city and to fetch the data
function getApi(cityInput) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=98dab0374d715d8b0802f2824300c3e2`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)

        currentWeather(data[0].lat,data[0].lon)
    })

}

// get the data for the city input 
function currentWeather(lat,lon){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=98dab0374d715d8b0802f2824300c3e2&units=imperial`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)

        cityEl.text(data.name + "           ")
        currentTempEl.text(data.main.temp)
        currentFeelsEl.text(data.main.feels_like)
        currentHumidityEl.text(data.main.humidity)
        currentWindEl.text(data.wind.speed)
        weatherIconEl.attr(
            'src',
            `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        ).attr('alt', data.weather[0].description);
    })

    fiveDayForecast(lat,lon)
}

// data for 5 day forecast
function fiveDayForecast(lat,lon) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=98dab0374d715d8b0802f2824300c3e2&units=imperial`)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data)
        var day1 = data.list[4]
        var day2 = data.list[12]
        var day3 = data.list[20]
        var day4 = data.list[28]
        var day5 = data.list[36]
        var fiveCast = [day1, day2, day3, day4, day5]
        console.log(fiveCast)
        for (var i=0; i <= 5; i++) {
            let fiveDayCast = fiveCast[i].dt_txt;
            let currDay = fiveCast[i];
                    $(`div.day-${i} .card-title`).text(moment(fiveDayCast).format('L'));
                    $(`div.day-${i} .fiveDayCast-img`).attr(
                        'src',
                        `http://openweathermap.org/img/wn/${currDay.weather[0].icon}.png`
                    ).attr('alt', currDay.weather[0].description);
                    $(`div.day-${i} .fiveDayCast-temp`).text(currDay.main.temp);
                    $(`div.day-${i} .fiveDayCast-feels`).text(currDay.main.feels_like);
        }
    })
}
