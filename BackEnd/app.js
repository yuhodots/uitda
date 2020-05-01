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
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.io = io;

var sequelize = require('./models/index').sequelize;
sequelize.sync();
/* Increase event listener */
// node는 event listener 10개 넘기면 오류로 간주하는게 default
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(15);

app.use(session({
  secret: '1234DSFs@adf1234!@#$asd',
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore(session_store_object) // session-store.js 정보 로드
}));
var passport = require('./lib/passport')(app);

/* Router */
var indexRouter = require('./routes/index');
var marketRouter = require('./routes/market');
var networkingRouter = require('./routes/networking');
var carpoolRouter = require('./routes/carpool');
var manageRouter = require('./routes/manage');
var chattingRouter = require('./routes/chatting');
var loginRouter = require('./routes/login')(passport);
var usersRouter = require('./routes/users');
var commentRouter = require('./routes/comment');
var proposalRouter = require('./routes/proposal');
var likeyRouter = require('./routes/likey');


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

/* Middleware installation : Router */
app.use('/api/', indexRouter);
app.use('/api/market', marketRouter);
app.use('/api/networking', networkingRouter);
app.use('/api/carpool', carpoolRouter);
app.use('/api/manage', manageRouter);
app.use('/api/chatting', chattingRouter);
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/comment', commentRouter);
app.use('/api/proposal', proposalRouter);
app.use('/api/likey', likeyRouter);


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

server.listen(3000,'127.0.0.1',() => console.log('App listening on port 3000!'))

let socket = require('./lib/socket')(io);
