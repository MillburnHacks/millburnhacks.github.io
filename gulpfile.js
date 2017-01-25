var gulp = require("gulp"),
    minifycss   = require('gulp-minify-css'),
    prefix      = require('gulp-autoprefixer'),
    sass = require("gulp-sass");
    

gulp.task('sass', function () {
    return gulp.src('styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(minifycss())
        .pipe(gulp.dest('dist'));
});
 
gulp.task('watch', ["default"], function () {
  gulp.watch('styles/**', ['sass']);
});

gulp.task('default', ['sass']);