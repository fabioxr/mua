var gulp = require('gulp');
var jade = require('gulp-pug');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var browserSync = require('browser-sync');


gulp.task('sass', gulp.series(() => {
  return gulp.src('sass/main.sass')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream())
}));


gulp.task('jade', gulp.series(() => {
  return gulp.src('jade/*.pug')
    .pipe(jade())
    .pipe(gulp.dest('build'))
}));


gulp.task('serve', gulp.series(() => {

    browserSync.init({
      server: './build/'
    })

    gulp.watch('./jade/*.pug', gulp.parallel(['jade']));
    gulp.watch('./sass/*.sass', gulp.parallel(['sass']));
    gulp.watch('./sass/**/*.sass', gulp.parallel(['sass']));
    gulp.watch('./build/*.html').on('change', browserSync.reload);
}));


gulp.task('default', gulp.series(['serve']));