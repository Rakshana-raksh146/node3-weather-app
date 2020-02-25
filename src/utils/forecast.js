const request = require('request')
const forecast = (long,lat,callback) => {
    const url = 'https://api.darksky.net/forecast/14fdf33300ccae4797743f31be61335f/' + encodeURIComponent(long) +','+ encodeURIComponent(lat)
    request({ url, json: true }, (error,{body}) => {
        if(error){              //when no internet connection
            callback('Unable to connect to weather app services',undefined)
        }
        else if(body.error){          //when long/lat is missing
            callback('Unable to find the location',undefined)
        }else{
            callback(undefined ,body.daily.data[0].summary + "It is currently "+ body.currently.temperature +" degrees out. This high today " +  body.daily.data[0].temperatureHigh + " with a low of " + body.daily.data[0].temperatureLow + ". There is a " + body.currently.precipProbability + "% chance of rain. " )
        }
    })
}


module.exports = forecast