const request = require('postman-request')

const geocode = (address,callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZHVuY2FudGF5bG9yIiwiYSI6ImNqd2Y3M3V4bDFqeGU0YW1xZm9yOXdqMW0ifQ.XbM_olZJHMt4QJf0Wm4xvQ&limit=1`

    request({url,json:true},(error,{body})=>{

        const {features:featuresData} = body

        if (error){
            callback('Unable to connect to location services!',undefined)
        }else if( featuresData.length === 0){
            callback('Unable to find lcoation. Try another search.')
        }else{
            const features = featuresData[0]
            callback(undefined,{
                    longditude:features.center[0],
                    latitude:features.center[1],
                    placeName:features.place_name
                }) 
        }

    })
}

module.exports = {
    geocode
}