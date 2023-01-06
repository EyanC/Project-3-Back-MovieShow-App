//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require ('mongoose');
const cors = require('cors')
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
const Movies = require('./models/movieDataSchema.js')

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, () => {
  console.log('connected')
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(cors())

//                      ___________________
//                           Routes
//                      ___________________


                        //Create Route
app.post('/', (req, res) => {
  console.log(req)
   Movies.create(req.body, (err, createdMovie) => {
    //  console.log(req.body)
     res.json(createdMovie)
   })
 })
 
                    //index route/ grabbing all data
 app.get('/', (req, res) => {
  Movies.find({}, (err, foundMovie) => {
     res.json(foundMovie)
   })
 })
 
                           //delete route..
 app.delete('/:id', (req, res) => {
  Movies.findByIdAndRemove(req.params.id, (err, deletedMovie) => {
     res.json(deletedMovie)
   })
 })
 
                           //Update route
 app.put('/:id', (req, res) => {
   Movies.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedMovie) => {
     res.json(updatedMovie)
   })
 })


//___________________
//localhost:3000

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT))