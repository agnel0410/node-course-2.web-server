const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const app = express()

const port = process.env.PORT || 3000
 
hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine',hbs)

app.use((req,res, next)=>{
  let log = `${new Date().toString()}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n' , (err)=>{
    if (err){
      console.log(`Unable to append to the file . Error : ${err}`)
    }
  })
  next()
})


app.use((req, res, next)=>{
  res.render('maint.hbs')
})

app.use(express.static(__dirname + '/public'))


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase()
})


app.get('/',(req, res)=>{
 res.render('home.hbs',{
   pageTitle: 'Home Page',
   welcomeMessage: 'Welcome Fella!'
 })
})

app.get('/about',(req, res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
  })
})
app.listen(port, ()=>{
  console.log(`Server is up on port : ${port}`)
})