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
import { Server as KarmaServer } from 'karma';

const paths = {
    src: 'src',
    dist: 'dist',
    bootstrap: './node_modules/bootstrap/less/bootstrap.less',
    mainLess: 'src/styles.less',
    lessFiles: 'src/**/*.less',
    sourceJs: 'src/**/*.js',
    templates: 'src/**/*.tpl.html'
};

const templateModuleName = 'GithubSearch.templates';

gulp.task('scripts:source',  () => {
    var bundler = browserify(`${paths.src}/main.js`);
    bundler.transform(babelify);

    bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('scripts:vendor',  () => {
    var bundler = browserify(`${paths.src}/vendor.js`);
    bundler.transform(babelify);

    bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source('vendor.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
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
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('scripts:templates', () => {
    return gulp.src(paths.templates)
        .pipe(html2Js({
            moduleName: templateModuleName,
            base: paths.source
        }))
        .pipe(concat('templates.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('html', () => {
    return gulp.src(`${paths.src}/index.html`)
        .pipe(gulp.dest(paths.dist))
});

gulp.task('test:lint', () => {
    return gulp.src(paths.sourceJs)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});
gulp.task('test:unit', (cb) => {
    new KarmaServer({
        basePath: '',
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        reporters: ['progress'],
        port: 9898,
        captureTimeout: 6000,
        singleRun: true,
        files: [
            'node_modules/phantomjs-polyfill/bind-polyfill.js',
            'dist/vendor.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'dist/templates.js',
            'dist/main.js',
            'src/**/*Spec.js'
        ],
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher'
        ]
    }, cb).start();
});

gulp.task('scripts', ['scripts:templates', 'scripts:vendor', 'scripts:source']);
gulp.task('styles', ['styles:source', 'styles:bootstrap']);
gulp.task('build', ['scripts', 'styles', 'html']);
gulp.task('test', ['test:unit', 'test:lint']);

gulp.task('default', () => {

    runSequence('build', 'test');

    gulp.watch(paths.sourceJs, function() {
        runSequence('scripts:source','test');
    });
    gulp.watch(`${paths.src}/**/*.html`, ['templates']);
    gulp.watch(paths.lessFiles, ['styles:source']);
    gulp.watch(`${paths.src}/index.html`, ['copy']);
});

