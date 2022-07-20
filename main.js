const api = {
    key: 'c5a3da79e6f253015e9c856837f98a0c',
    base: 'http://api.openweathermap.org/data/2.5/'
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery)

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value)
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(response => { if (response.ok) { return response.json() }
        throw new Error('Please enter a valid locaton')
    }).then(responseJson => {
        displayResults(responseJson)
        showContainer2()
    }).catch(error => {
        hideContainer2()
        alert(error)
    })
}

function showContainer2(){
    return document.getElementById("app-wrap2").style.display = "block";
}

function hideContainer2() {
    return document.getElementById("app-wrap2").style.display = "none";
}

function displayResults(weather) {
console.log(weather)
  let city = document.querySelector('.location .city')
  city.innerText = `${weather.name}, ${weather.sys.country}`

  let now = new Date()
  let date = document.querySelector('.location .date')
  date.innerText = dateBuilder(now)

  let temp = document.querySelector('.current .temp')   
  temp.innerHTML = `${Math.round(weather.main.temp)}\u00B0c`
  
  let weather_el = document.querySelector('.current .weather')
  weather_el.innerText = weather.weather[0].main

  let x = document.getElementsByClassName('weather_icon')[0]
  let icon = weather.weather[0].icon
  x.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
  
  let hilow = document.querySelector('.hi-low')
  hilow.innerText = `${Math.round(weather.main.temp_min)} / ${Math.round(weather.main.temp_max)}\u00B0c`
  
  let humidity = document.querySelector('.humidity')
  humidity.innerText = `Humidity : ${weather.main.humidity}%`

  let windSpeed = document.querySelector('.windSpeed')
  windSpeed.innerText = `Wind Speed : ${Math.round(weather.wind.speed * 2.23694)}mph`

  let windDirection = document.querySelector('.windDirection')
  windDirection.innerText = `Wind Direction : ${weather.wind.deg}\u00B0`

  let visibility = document.querySelector('.visibility')
  visibility.innerText = `Visibility : ${weather.visibility / 1000}km`
    
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  let day = days[d.getDay()]
  let date = d.getDate()
  let month = months[d.getMonth()]
  let year = d.getFullYear()

  return `${day} ${date} ${month} ${year}`
}