class Weather {
  constructor(city) {
    this.apiKey = '4e4320bcf8891b8fa75133f83c2b8634';
    this.city = city;
    this.units = 'metric';
    //this.lang = 'al'; //it's not working
  }

  // Fetch weather from API
  async getWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=${this.units}&appid=${this.apiKey}`);

    const responseData = await response.json();

    return responseData;
  }

  // Change weather location 
  changeLocation(city) {
    this.city = city;
  }
}
