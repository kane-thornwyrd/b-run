var
  gulp   = require('gulp'),
  gutil  = require('gulp-util'),
  server = require('gulp-server-livereload')
;

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      open: true
    }));
});
