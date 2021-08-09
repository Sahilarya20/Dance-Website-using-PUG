const express=require('express');
const path=require('path');
const bodyparaser=require('body-parser');
// const fs=require('fs');
const app=express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Contactdance', {useNewUrlParser: true, useUnifiedTopology: true});
const port= process.env.PORT || 8000;


// define mongoose Schema

var contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

var contact = mongoose.model('Contact', contactschema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    
    res.status(200).render('home.pug');
})
app.get('/contact', (req, res)=>{
    
    res.status(200).render('contact.pug' );
})
app.post('/contact', (req, res)=>{
    var myData= new contact(req.body)
    myData.save().then(()=>{
        res.render('saved.pug')
    }).catch(()=>{
        res.status(200)  .status(400).send("item has not been saved")
    });
    // res.status(200).render('contact.pug');
});


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});