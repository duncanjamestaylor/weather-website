const path = require('path')
const express = require('express')
const hbs = require('hbs')

const { geocode } = require('./utils/geocode')
const { forecast } = require('./utils/forecast')


const app = express()
const port = process.env.PORT  || 3000

// Define paths for the Express config.
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup static directory to serve.
app.use(express.static(publicDir))

// Setup Handlebars engine and views location.
app.set('view engine','hbs')     
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
 
app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Duncan"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:"Duncan"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"Duncan",
        message:'A help message from the other side! Don\'t worry ecevrything will be okay!'
    })
}) 

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address.'
        })
    }

    geocode(req.query.address,(error, {latitude,longditude ,placeName}={})=>{

        if (error){
            return res.send({
                error
            })
        }

        forecast(latitude,longditude,(error,{condition,temp_c,feelslike_c} = {})=>{
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                condition,
                temp_c,
                feelslike_c,
                address:req.query.address,
                location:placeName
            })

        })

    })


})


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Search term required'
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"Duncan",
        message:'Help article not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"404.",
        name:"Duncan",
        message:'Page not found.'
    })
})

app.listen(port,()=>{
    console.log(`Server is up on port ${port}.`)
})  