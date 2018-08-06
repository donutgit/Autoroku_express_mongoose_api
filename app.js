var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

//fileupload
// const fileUpload = require('express-fileupload');
// const formidable = require('express-formidable');
// const busboy = require('connect-busboy');
// const busboyBodyParser = require('busboy-body-parser');
const uploadRouter = require('./routes/upload');
//fileupload
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const carsRouter = require('./routes/api/cars');
const nomRouter = require('./routes/api/nominations');
const votesRouter = require('./routes/api/votes');
const fileRouter = require('./routes/file');

var app = express();

//bodyParser Middleware
app.use(bodyParser.json());
// app.use(fileUpload());
// app.use(formidable());
// app.use(busboy());
// app.use(busboyBodyParser());
app.use(cors());

//DB Config
// const db = require("./config/keys").mLabURI;

//Connect to Mongo
// mongoose
//   .connect(db)
//   .then(() => console.log("mongodb connected"))
//   .catch(err => console.log(err));

mongoose
  .connect('mongodb://localhost/nodedb')
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

// let db = mongoose.connection;
// db.on('error', (err) => console.log(err))
// db.once('open', () => console.log('Connecter to mongo db'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
app.use('/api/cars', carsRouter);
app.use('/api/nominations', nomRouter);
app.use('/api/votes', votesRouter);
app.use('/file', fileRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
