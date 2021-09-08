class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.string = document.getElementById('w-string');
    this.details = document.getElementById('w-details');
    this.icon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    this.feelsLike = document.getElementById('w-feels-like');
    this.wind = document.getElementById('w-wind');
    this.pressure = document.getElementById('w-pressure');
  }

  paint(weather) {
    this.location.textContent = `${weather.name}, ${weather.sys.country}`;
    this.desc.textContent = weather.weather[0].description;
    // this.desc[0] = this.desc[0].toUpperCase(); //not working
    this.string.innerHTML = `${weather.main.temp.toFixed(1)}&#8451;`;
    this.icon.setAttribute('src', `http://api.openweathermap.org/img/w/${weather.weather[0].icon}.png`)
    this.feelsLike.textContent = `Feels Like: ${weather.main.feels_like.toFixed(1)}`;
    this.humidity.textContent = `Relative Humidity: ${weather.main.humidity}%`;
    this.wind.textContent = `Wind: ${weather.wind.speed} KMH`;
    this.pressure.textContent = `${weather.main.pressure}	hPa`;
  }
}

