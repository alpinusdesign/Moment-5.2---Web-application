/* Includes */
const gulp = require("gulp");
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const browserSync = require('browser-sync').create();
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const terser = require('gulp-terser');

/* - File paths - */
const files = {
    htmlPath: "src/*.html",
    sassPath: "src/scss/*.scss",
    jsPath: "src/**/*.js",
    imgPath: "src/img/*"
  }

// Task: Compile, minify and rename SASS-files before moving to new publishing folder.
function sassTask()
{
  return gulp.src(files.sassPath)
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
  .pipe(rename("styles.css"))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./pub/css'))
  .pipe(browserSync.stream());
}

// Task: Copy HTML.
function htmlTask()
{
  return gulp.src(files.htmlPath)
  .pipe(gulp.dest('pub'))
  .pipe(browserSync.stream());
}


// Task: Concatenate and minify Javascript.
function jsTask()
{
  return gulp.src(files.jsPath)
  .pipe(sourcemaps.init())
  .pipe(concat('main.js'))
  .pipe(terser())
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('pub/js'))
  .pipe(browserSync.stream());
}

// Task: Watcher.
function watchTask()
{
  // - Establish local server connection.
  browserSync.init({
    server: {
        baseDir: 'pub/'
    }
  });

  // - Watch files.
  gulp.watch([files.htmlPath, files.sassPath, files.jsPath],
    gulp.parallel(htmlTask, sassTask, jsTask)
  ).on('change', browserSync.reload);
}

/* - Default - */
exports.default = gulp.series(
  gulp.parallel(htmlTask, sassTask, jsTask), watchTask);