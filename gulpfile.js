const gulp = require('gulp');
const webpack = require('webpack-stream');
const preset = require('babel-preset-react');
const babel = require('babel-loader');


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

gulp.task('build:dev', ['webpack:dev', 'html:dev']);

gulp.task('default', 'build:dev');
