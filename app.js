/* Module load */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet')
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var session_store_object = require('./config/session-store');
var passport = require('passport');
var app = express();

/* Increase event listener */
// node는 event listener 10개 넘기면 오류로 간주하는게 default
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(15);

/* Router */
var indexRouter = require('./routes/index');
var marketRouter = require('./routes/market');
var networkingRouter = require('./routes/networking');
var carpoolRouter = require('./routes/carpool');
var manageRouter = require('./routes/manage');
var chattingRouter = require('./routes/chatting');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');

/* View engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Middleware installation : Express generator Default */
app.use(helmet())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

/* Middleware installation : Addition */
app.use(session({
  secret: '1234DSFs@adf1234!@#$asd',
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore(session_store_object) // session-store.js 정보 로드
}));
app.use(passport.initialize()); // passport 사용 하도록 세팅
app.use(passport.session()); // passport 사용 시 session을 활용

/* HTTPS redirection */
// 로컬에서는 이 파트를 주석처리 해야 오류가 나지 않습니다. 
/* app.use(function(req, res, next) { 
  var xForwarded = req.get('X-Forwarded-Proto');
  console.log(xForwarded);
	if(xForwarded !== 'https') {
    console.log('https://' + req.get('Host') + req.url);
    res.redirect('https://' + req.get('Host') + req.url);
	}
});*/

/* Middleware installation : Router */
app.use('/', indexRouter);
app.use('/market', marketRouter);
app.use('/networking', networkingRouter);
app.use('/carpool', carpoolRouter);
app.use('/manage', manageRouter);
app.use('/chatting', chattingRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);

/* Catch 404 and forward to error handler */
app.use(function(req, res, next) {
  next(createError(404));
});

/* Error handler */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000,'127.0.0.1',() => console.log('App listening on port 3000!'))