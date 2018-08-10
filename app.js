const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('connected to database ' + config.database)
});

mongoose.connection.on('error', (error) => {
    console.log('error occured during cunnting database: ' + error)
});

const app = express();

//Port Number
//Port Number
const port = process.env.PORT || 8080;
// const port = 3000;

//Cors Middleware
app.use(cors())

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

//Index Route
app.get('/', (req, res) => {
    res.send('Response from endpooint');
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
})

//Start Server
app.listen(port,  () => {
    console.log('Server started on port '+ port);
});