const gulp = require('gulp');
const minifycss = require('gulp-minify-css');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass');


gulp.task('sass', () => gulp.src('styles/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(minifycss())
  .pipe(gulp.dest('dist')));

gulp.task('watch', ['default'], () => {
  gulp.watch('styles/**', ['sass']);
});

gulp.task('default', ['sass']);
