const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//DEfine paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directroy
app.use(express.static(publicDirectoryPath))       //to refer to html docs//automatically connects to root

/*app.get('/help',(req,res) => {      //request,response
res.send({
    name:'Raksh',
    age:22
})
})

app.get('/about',(req,res) => {
    res.send('<h1>About</h1>')
})
*/
app.get('',(req,res)=>{
res.render('index',{
    title:'Weather App',
    name:'Raksh'
})     //renders hbs file named index
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Raksh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        msg:'How can we help you',
        name:'Raksh'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
      return res.send({
        error:'You must give an address to search'
       })
    }

    {
        geocode(req.query.address, (error,{ latitude,longitude,location } = {} ) => {
        if(error)
        {
        return res.send({error})
        }
    
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({error}) 
            }
            return res.send({
                location,
                forecast :forecastData,
                address:req.query.address
            })
            
        })
    })
    }

    /*console.log(req.query.address)
    res.send({
        forecast:'Its 30 degrees',
        country:'India',
        address: req.query.address
    })*/
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Rakshana',
        errorMsg:'Help article not found'
    })
})

//when we goto website which not declared &defined
app.get('*',(req,res)=>{        //'*' is for all other undefined webpages
    res.render('404',{
        title:'404',
        name:'Rakshana',
        errorMsg:'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port )
})