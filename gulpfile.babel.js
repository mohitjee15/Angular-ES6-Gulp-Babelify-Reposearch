require('babel-register')({
    presets: [
        'es2015'
    ]
});

import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import gulp from 'gulp';
import less from 'gulp-less';
import clean  from  'gulp-clean' ;
import concat  from  'gulp-concat' ;
import jshint  from  'gulp-jshint' ;
import html2Js  from  'gulp-ng-html2js' ;
import plumber  from  'gulp-plumber' ;
import sourcemaps from 'gulp-sourcemaps';
import runSequence from 'run-sequence';

const paths = {
    src: 'src',
    dist: 'dist',
    bootstrap: './node_modules/bootstrap/less/bootstrap.less',
    mainLess: 'src/styles.less',
    lessFiles: 'src/**/*.less',
    templates: 'src/**/*.tpl.html'
};

const cssFileName = 'styles.css';
const templateModuleName = 'GithubSearch.templates';


gulp.task('scripts:source',  () => {
    var bundler = browserify(`${paths.src}/main.js`);
    bundler.transform(babelify);

    bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source('main.js'))
        .pipe(buffer())
        //.pipe(uglify()) // Use any gulp plugins you want now
        .pipe(gulp.dest(paths.dist));
});

gulp.task('scripts:vendor',  () => {
    var bundler = browserify(`${paths.src}/vendor.js`);
    bundler.transform(babelify);

    bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source('vendor.js'))
        .pipe(buffer())
        //.pipe(uglify()) // Use any gulp plugins you want now
        .pipe(gulp.dest(paths.dist));
});

gulp.task('styles:bootstrap', () => {
    return gulp.src(paths.bootstrap)
        .pipe(less({}))
        .pipe(concat('vendor.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('styles:source', () => {
    return gulp.src(paths.mainLess)
        .pipe(less({}))
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('templates', () => {
    return gulp.src(paths.templates)
        .pipe(html2Js({
            moduleName: templateModuleName,
            base: paths.source
        }))
        .pipe(concat('templates.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copy', () => {
    return gulp.src(`${paths.src}/index.html`)
        .pipe(gulp.dest(paths.dist))
});

gulp.task('clean', () => {

});

gulp.task('build', () => {
    runSequence('templates', 'copy', 'scripts:source', 'styles:source', 'scripts:vendor', 'styles:bootstrap');
});


gulp.task('default',['build'], () => {
    gulp.watch(`${paths.src}/**/*.js`, ['scripts:source']);
    gulp.watch(`${paths.src}/**/*.html`, ['templates']);
    gulp.watch(paths.lessFiles, ['styles:source']);
    gulp.watch(`${paths.src}/index.html`, ['copy']);
});

