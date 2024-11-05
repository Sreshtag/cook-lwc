import { LightningElement } from 'lwc';
import WEATHER_ICON from '@salesforce/resourceUrl/weatherAppIcons'
import getweatherdata from '@salesforce/apex/weatherAPIcontroller.getweatherdata'

export default class WeatherData extends LightningElement {
    clearicon = WEATHER_ICON + '/weatherAppIcons/clear.svg'
    cloudicon = WEATHER_ICON + '/weatherAppIcons/cloud.svg'
    dropleticon = WEATHER_ICON + '/weatherAppIcons/droplet.svg'
    hazeicon = WEATHER_ICON + '/weatherAppIcons/haze.svg'
    mapicon = WEATHER_ICON + '/weatherAppIcons/map.svg'
    rainicon = WEATHER_ICON + '/weatherAppIcons/rain.svg'
    snowicon = WEATHER_ICON + '/weatherAppIcons/snow.svg'
    stormicon = WEATHER_ICON + '/weatherAppIcons/storm.svg'
    thermometericon = WEATHER_ICON + '/weatherAppIcons/thermometer.svg'
    arrowback = WEATHER_ICON + '/weatherAppIcons/arrow-back.svg'



    response = ""
    city = ""
    loadingText = ""
    isError = false
    weatherIcon = ""

    formHandler(event) {
        event.preventDefault()
        this.fetchdata()

    }
    searchHandler(event) {
        this.city = event.target.value

    }
    fetchdata() {
        this.isError = false
        this.loadingText = 'Fetching weather details'

        getweatherdata({ city: this.city }).then(result => {
            this.weatherDeatils(JSON.parse(result))
        }).catch((error) => {
            this.response = null
            console.log("Oops some error occured", error)
            this.isError = true
        })


    }
    weatherDeatils(info) {
        if (info.cod === "404") {
            this.loadingText = `${this.city} is not a valid city`
            this.isError = true
        }
        else {
            this.loadingText = ""
            const city = info.name
            this.isError = false
            const country = info.sys.country
            const { description, id } = info.weather[0]
            const { temp, feels_like, humidity } = info.main
            if (id === 800) {
                this.weatherIcon = this.clearicon
            }
            else if (id >= 200 && id <= 232 || id >= 600 && id <= 622) { this.weatherIcon = this.stormicon }
            else if (id >= 701 && id <= 781) { this.weatherIcon = this.hazeicon }
            else if (id >= 801 && id <= 804) { this.weatherIcon = this.cloudicon }
            else if (id >= 500 && id <= 531 || id >= 300 && id <= 321) { this.weatherIcon = this.rain }
            this.response = {
                city: city,
                country: country,
                description: description,
                temperature: Math.floor(temp),
                location: `${city} ${country}`,
                feelslike: Math.floor(feels_like),
                humidity: `${humidity}%`
            }
        }

    }

    get load() {
        return this.isError ? 'error' : 'load'
    }
    backHandler() {
        this.response = null
        this.city = ""
        this.loadingText = ""
        this.isError = false
        this.weatherIcon = ""
    }
}