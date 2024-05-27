// function for changing background image based on local time. //
function change_background(){
    var d = new Date();
    var n = d.getHours();
    
    if (n > 20 || n <= 4) {
        document.getElementById("body").style.backgroundImage="url('images/night.jpeg')";
    } else if (n > 4 || n == 9) {
        document.getElementById("body").style.backgroundImage="url('images/morning.jpeg')";
    } else if (n > 9 || n <= 15) {
        document.getElementById("body").style.backgroundImage="url('images/clear.jpeg')";
    } else if(n > 15 || n <= 20) {
        document.getElementById("body").style.backgroundImage="url('images/dusk.jpeg')";
    } else {
        document.getElementById("body").style.backgroundImage="url('')";
    }
};

change_background();
setInterval(change_background, 1000 * 60 * 60);
// End of local function  code //
const form = document.querySelector("#search-form");
const searchBar = document.querySelector("#search-bar");
const btn = document.querySelector("#search-btn");

const card = document.querySelector(".info-card");
const tempCard = document.querySelector(".temp-card");

const apiKey = '77d8682a3694da999bb37bc263fc5fdb';


form.addEventListener('submit', async event => {

    event.preventDefault();

    const city = searchBar.value;

    if(city){
      try {
          const weatherData = await getweatherData(city);
          displayweatherInfo(weatherData);
      }
      catch(error){
          console.error(error);
          displayError(error);

      }
    } 
    else {
          displayError("Please Enter City");
    }
});

async function getweatherData(city) {
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok) {
        throw new Error("could not fetch weather data");
    }

    return await response.json();
}

function displayweatherInfo(data) {
    const {name: city, 
           main: {temp, humidity}, 
           weather:[{description, id}]
    } = data;
  card.textContent="";
  

  const weatherEmoji = document.createElement("p");
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
 
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp}°K`;
    
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    
    card.appendChild(cityDisplay);
    tempCard.appendChild(tempDisplay);
}
function getweatherEmoji(weatherID) {

}

function displayError(message) {

  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.appendChild(errorDisplay);

}