//initialize modules
const autoprefixer = require('gulp-autoprefixer');
const {src, dest, watch, parallel, task, series} = require('gulp');

const rename = require('gulp-rename')
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const browserSync = require('browser-sync').create();




// File path variables
const files = {
    scssPath:'app/scss/**/*.scss',
   
}


//Sass task
function scssTask(done) {
     src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass({
        errorLogToConsole: true,
        outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 8 versions'],
        cascade: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('./app/css/style.css'))
    .pipe(browserSync.stream())
    done();
}

// browserSync
function sync(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3001
    });
    done();
}

//Watch task
function watchTask(){
    watch("./app/scss/**/*", scssTask)
}


//Default task
task('default', parallel(sync,watchTask))



