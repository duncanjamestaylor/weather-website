const request = require('postman-request')

const forecast = (latitude,logditude,callback)=>{

    const url =`http://api.weatherapi.com/v1/forecast.json?key=ca874539e0bb4d5b8ba213118230509&q=${latitude},${logditude}&days=1&aqi=no&alerts=no`

console.log(url)

    request({url,json: true},(error,{body})=>{

        const {error:dataErr, current, location, forecast} = body
        console.log(forecast.forecastday[0].day)
        if (error){
            callback('Unable to connect to the weather service.',undefined)
        }else if(dataErr){
            callback("Unable to find location",undefined)
        }else{

            callback(undefined,{
                condition:current.condition.text,
                temp_c:current.temp_c,
                feelslike_c:current.feelslike_c,
                location:`${location.name},${location.region},${location.country}.`,
                temp_hi:forecast.forecastday[0].day.maxtemp_c,
                temp_lo:forecast.forecastday[0].day.mintemp_c
            })
        }
    })

}

module.exports = {
    forecast
}