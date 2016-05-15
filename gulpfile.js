const gulp = require('gulp');
const webpack = require('webpack-stream');
// const preset = require('babel-preset-react');
// const babel = require('babel-loader');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

gulp.task('html:dev', () => {
  gulp.src(__dirname + '/app/**/*.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('webpack:dev', () => {
gulp.src(__dirname + '/app/js/client.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loaders: [ 'babel-loader?presets[]=react' ]
        }
      ]
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('tests:dev', ['lint:test'], () => {
  gulp.src(__dirname + '/test/**/*.js')
    .pipe(mocha({reporter: 'nyan'}));
});
gulp.task('lint:test', ['lint:nontest'], () => {
  return gulp
  .src('./test/**/*test.js')
  .pipe(mocha({reporter: 'nyan'}))
  .pipe(eslint())
  .pipe(eslint.format());
});
gulp.task('lint:nontest', () => {
  return gulp
  .src(['/lib/**/*.js', '/app/js/**/*.js', '/models/**/*.js'])
  .pipe(eslint())
  .pipe(eslint.format());
});
gulp.task('build:dev', ['tests:dev', 'webpack:dev', 'html:dev']);

gulp.task('default', ['build:dev', 'lint:test', 'lint:nontest']);
