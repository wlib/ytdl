var gulp = require("gulp");
var babel = require("gulp-babel")
var uglify = require("gulp-uglify");
var rollup = require("rollup");

gulp.task("client:rollup", function () {
  return rollup.rollup({ entry: "./src/client/main.js" })
    .then(function (bundle) {
      bundle.write({
        format: "es",
        moduleName: "client",
        dest: "./ytdl/js/client.js",
        sourceMap: true
      });
    })
});

gulp.task("client", ["client:rollup"], function() {
  return gulp.src("./ytdl/js/client.js")
    .pipe( babel({ presets: ["es2015"] }) )
    .pipe( uglify({mangle: false}) )
    .pipe( gulp.dest("./ytdl/js/") );
});

gulp.task("endpoint:rollup", function () {
  return rollup.rollup({ entry: "./src/endpoint/main.js" })
    .then(function (bundle) {
      bundle.write({
        format: "es",
        moduleName: "main",
        dest: "./ytdl/js/endpoint.js",
        sourceMap: true
      });
    })
});

gulp.task("endpoint", ["endpoint:rollup"], function() {
  return gulp.src("./ytdl/js/endpoint.js")
    .pipe( babel({ presets: ["es2015"] }) )
    .pipe( uglify({mangle: false}) )
    .pipe( gulp.dest("./ytdl/js/") );
});

gulp.task("default", ["client", "endpoint"], function() {});