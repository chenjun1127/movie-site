//导入依赖模块
var express = require('express');
var path = require('path')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
// 连接数据库
var dbUrl = 'mongodb://localhost/express-demo';
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

//设置端口
var port = process.env.PORT || 8100;
var app = express();
var index = require('./routes/movie/index');
var admin = require('./routes/admin/admin');
var user = require('./routes/user/user');
var category = require('./routes/admin/categoryAdmin');
var userCenter = require('./routes/admin/userCenter');
var status = require('./routes/status/status');
app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(path.join(__dirname, 'public'))) // 设置静态目录
var moment = require('moment');
moment.locale('zh-cn');
app.locals.moment = moment // 定义整个项目使用moment
app.use(session({
	secret: 'express-movie-demo',
	name: 'login-user', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 5
	}, //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
	store: new MongoStore({
		url: dbUrl,
		collection: 'sessions'
	}),
	resave: false,
	saveUninitialized: true
}))
app.listen(port, () => {
	console.log('server running on port: ' + port);
});


app.use((req, res, next) => {
	// console.log("user in session:"+req.session.user)
	var _user = req.session.user;
	if(_user){
		res.locals.user = _user;
	}
	next();
})

app.use((err, req, res, next) => {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
})


// index route
app.use('/', index);
// status:success || fail
app.use('/', status);
// user route
app.use('/', user);
// admin route
app.use('/', admin);
// admin category
app.use('/', category);
// user center
app.use('/', userCenter);

