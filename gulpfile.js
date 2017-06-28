var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: 'http://localhost:8100',
		files: ['**'],
		browser: 'chrome',
		notify: false,
		port: 3000
	});
	// gulp.watch('sass/*.scss', ['sass-watch']);
});

gulp.task('js', function() {
	return gulp.src(['./routes/**/*.js', './schemas/*.js', './public/js/*.js']) // 检查文件：js目录下所有的js文件
		.pipe(jshint()) // 进行检查
		.pipe(jshint.reporter('default')) // 对代码进行报错提示
});

gulp.task('nodemon', function(cb) {
	var called = false;
	return nodemon({
		script: 'app.js'
	}).on('start', function() {
		if (!called) {
			cb();
			called = true;
		}
	});
});

gulp.task('clean', function(cb) {
	del(['./dist'], cb)
});

gulp.task('dist', ['js']);

gulp.task('default', ['browser-sync']);