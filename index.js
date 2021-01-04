const express = require('express')
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const passport_config = require('./config/passport')

passport_config.initPassport(passport)

mongoose.connect(
	'mongodb://localhost:27017/first-assignment',
	{
		useUnifiedTopology: true,
		useNewUrlParser: true
	}
);
var db = mongoose.connection;


const app = express();

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require('./Routes/user.route'));

app.listen(8080);