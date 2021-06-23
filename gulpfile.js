const gulp        = require('gulp');
const webpack = require("webpack-stream");
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

 const dist = "./dist/"; 
/*  const dist = "C:/MAMP/htdocs/test";  */

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: `${dist}`
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(`${dist}/css`))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/*/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/js/**/*.js").on('change', gulp.parallel('build-js'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/blocks/*/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(`${dist}/`));
});
gulp.task("build-js", () => {
    return gulp.src("src/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'main.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(`${dist}`))
                .on("end", browserSync.reload);
});

gulp.task('images', function () {
    return gulp.src("src/blocks/*/img/**/*")
        .pipe(rename({dirname: ''}))
        .pipe(imagemin())
        .pipe(gulp.dest(`${dist}/img`))
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html','build-js', 'images'));