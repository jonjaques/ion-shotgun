var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    app = express(),
    apiRouter = require('./routes/api'),
    errorHandlers = require('./routes/error');

app.set('env', process.env.APPENV);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api/v1', apiRouter);
app.use('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

// catch 404 and forward to error handler
app.use(errorHandlers.fourohfour);

// error handlers
if (app.get('env') === 'development') {
    app.use(errorHandlers.devError);
}

app.use(errorHandlers.prodError);

module.exports = app;