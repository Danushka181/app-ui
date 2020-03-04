"use strict";
// Load plugins
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cssnano = require("cssnano");
const gulp = require("gulp");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const imagemin = require('gulp-imagemin');

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    });
  done();
}



function imgMin(){
    return  gulp.src('dd/*')
            .pipe(imagemin())
            .pipe(gulp.dest('ss/'))
            .pipe(imagemin([
              imagemin.gifsicle({interlaced: true}),
              imagemin.mozjpeg({quality: 45, progressive: true}),
              imagemin.optipng({optimizationLevel: 4}),
              imagemin.svgo({
                  plugins: [
                      {removeViewBox: true},
                      {cleanupIDs: false}
                  ]
              })
          ]))
} 

// CSS task
function css() {
  return gulp
    .src("./assets/sass/**/*.scss")
    .pipe(postcss([ autoprefixer(), cssnano() ]))
    // .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./assets/css/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(browsersync.stream());
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Watch files
function watchFiles() {
  gulp.watch("./assets/sass/**/*", gulp.series(css, browserSyncReload, imgMin) )
  gulp.watch("./**/*.html", gulp.series( browserSyncReload) )
}

// define complex tasks
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.watch = watch;
// exports.imgMin = imgMin;