const search = document.getElementsByClassName("search");
const button = document.getElementsByClassName("mybutton");

const input = search[0].firstElementChild;

const weatherIcon = document.querySelector(".weathericon");

console.log(weatherIcon.src);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const value = input.value;
    checkweather(value);
  }
});

const apikey = "066cdf815fa7b630d06c32ab9cf2db64";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

async function checkweather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);

  if (response.status == 404) {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "block";
  } else {
    var data = await response.json();
    console.log(apiurl + city + `&appid=${apikey}`);

    document.querySelector(".country").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    console.log(data.weather[0].main);

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

button[0].addEventListener("click", function () {
  const value = input.value;
  checkweather(value);
})
