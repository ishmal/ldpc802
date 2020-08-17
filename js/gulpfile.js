const gulp = require("gulp");
const Mocha = require("./mocha-tool");
const eslint = require("gulp-eslint");

gulp.task("lint", () => {
    return gulp.src(["src/*.js"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("test", () => {
  let opts = {
    colors: true
  };
  let files = [
    "./test/*[tT]est.js",
    "./test/*[sS]pec.js"
  ];
  let mocha = new Mocha(opts);
  return mocha.runFiles(files);
});

gulp.task("default", gulp.parallel("lint", "test"));