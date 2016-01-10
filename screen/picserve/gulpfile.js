var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('default', function() {
    server.run(['server.js']);

    gulp.watch(['server.js'], [server.run]);
});
