console.log('main.js is connected!');

// This should be hidden
const usApiKey = 'e199593825b086d6af72bb083b9b13384f80a588b1489108503df7bf631a7a6e'
const owApiKey = 'e9da352d7560223033ad539ccdbd1038'
const weatherUrl = (zipCode) => `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&APPID=${owApiKey}&units=imperial`
const bgUrl = (tag) => `https://api.unsplash.com/photos/random?query=${tag}&client_id=${usApiKey}`


const body = document.getElementsByTagName('body')[0]
const initialContainer = document.getElementById('initial-container')
const initialForm = document.getElementById('initial-form')
const initialButton = document.getElementById('initial-button')
const initialField = document.getElementById('initial-field')
const resultContainer = document.getElementById('result-container')
const headerForm = document.getElementById('header-form')
const headerField = document.getElementById('header-field')

const tempLabel = document.getElementById('temperature')
const descLabel = document.getElementById('description')
const cityLabel = document.getElementById('city')
const minLabel = document.getElementById('min')
const maxLabel = document.getElementById('max')

initialForm.addEventListener('submit', submitForm(true))
headerForm.addEventListener('submit', submitForm(false))

function submitForm(isInitial) {
  return async function(event) {
    event.preventDefault();
    const zip = isInitial ? initialField.value : headerField.value
    const response = await fetch(weatherUrl(zip))
    const data = await response.json()
    console.log(data)
    await updateResults(data)
    isInitial && transitionToResultLayout()
  }
}


function transitionToResultLayout() {
  body.classList.remove('centered', 'main-page')
  initialContainer.classList.add('hidden')
  resultContainer.classList.remove('hidden')
}

async function updateResults(data) {
  const city = data.name.toUpperCase()
  const description = data.weather[0].description
  const tag = data.weather[0].main
  const temperature = Math.trunc(+data.main.temp)
  const min = Math.trunc(+data.main["temp_min"])
  const max = Math.trunc(+data.main["temp_max"])
  
  await setImage(tag)
  console.log(city)
  cityLabel.textContent = city
  tempLabel.textContent = `${temperature}°F`
  minLabel.textContent = `${min}°F`
  maxLabel.textContent = `${max}°F`
  descLabel.textContent = description.charAt(0).toUpperCase() + description.slice(1)
}

async function setImage(tag) {
  const response = await fetch(bgUrl(tag))
  const data = await response.json()
  body.style.backgroundImage = `url('${data.urls.full}')`;
}


/*


Here's an overview of the steps you'll follow to get your app to work...

STEPS
2. When the button is clicked
  - grab the input
  - store the value
  - make an API request based on the input value
3. When the API response is returned
  - grab all the appropriate DOM elements
  - append the data to the DOM

*/