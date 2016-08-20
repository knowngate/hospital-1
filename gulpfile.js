var gulp       = require('gulp'),
    elixir     = require('laravel-elixir'),
    ext        = require('gulp-ext-replace'),
    uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin     = require('gulp-cssmin');

require('laravel-elixir-remove');

var Task = elixir.Task;

elixir.extend('uglify', function(sourceFile, outputFolder)
{
    new Task('uglify', function()
    {
        return gulp.src(sourceFile)
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(ext('.min.js'))
            .pipe(gulp.dest(outputFolder))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(outputFolder));
    }).watch([sourceFile]);
});

elixir.extend('cssmin', function(sourceFile, outputFolder)
{
    new Task('cssmin', function()
    {
        return gulp.src(sourceFile)
            .pipe(sourcemaps.init())
            .pipe(cssmin())
            .pipe(ext('.min.css'))
            .pipe(gulp.dest(outputFolder))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(outputFolder));
    }).watch([sourceFile]);
});

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.copy('vendor/bower/adminlte/dist/img', 'public/assets/img');
    mix.copy('vendor/bower/datatables/media/images', 'public/assets/images');

    mix.copy('vendor/bower/adminlte/plugins/iCheck/square/blue.png', 'public/assets/css/');
    mix.copy('vendor/bower/adminlte/plugins/iCheck/square/blue@2x.png', 'public/assets/css/');

    mix.copy('vendor/bower/fontawesome/fonts', 'public/assets/fonts');

    mix.scripts(
        [
            'bower/jquery/dist/jquery.js',
            'bower/adminlte/bootstrap/js/bootstrap.js',
            'bower/adminlte/dist/js/app.js',
            'bower/adminlte/plugins/iCheck/icheck.js',
            'bower/adminlte/plugins/select2/select2.js',
            'bower/adminlte/plugins/select2/i18n/zh-CN.js',
            'bower/datatables/media/js/jquery.dataTables.js',
            'bower/datatables/media/js/dataTables.bootstrap.js',
            'bower/datatables-select/js/dataTables.select.js',
            'bower/bootstrap3-dialog/dist/js/bootstrap-dialog.js',
            'bower/multiselect/js/multiselect.js',
            'proengsoft/laravel-jsvalidation/public/js/jsvalidation.js',
            'bower/adminlte/plugins/datepicker/bootstrap-datepicker.js',
            'bower/adminlte/plugins/datepicker/locales/bootstrap-datepicker.zh-CN.js',
            'bower/jquery.cookie/jquery.cookie.js'
        ],
        'resources/assets/js/vendor.js',
        'vendor/'
    );

    mix.scripts(
        [
            'vendor.js'
        ],
        'public/assets/js/hospital.js',
        'resources/assets/js/'
    );

    mix.uglify('public/assets/js/hospital.js', 'public/assets/js/');
    mix.copy('vendor/bower/datatables-select/css', 'resources/assets/sass/datatables-select');
    mix.copy('vendor/bower/datatables-buttons/css', 'resources/assets/sass/datatables-buttons');
    mix.sass('datatables-select/select.dataTables.scss', 'resources/assets/css');
    mix.sass('datatables-buttons/buttons.dataTables.scss', 'resources/assets/css');

    mix.styles(
        [
            'adminlte/bootstrap/css/bootstrap.css',
            'adminlte/plugins/iCheck/square/blue.css',
            'adminlte/plugins/select2/select2.css',
            'adminlte/dist/css/AdminLTE.css',
            'adminlte/dist/css/skins/skin-blue.css',
            'fontawesome/css/font-awesome.css',
            'datatables/media/css/dataTables.bootstrap.css',
            'adminlte/plugins/datepicker/datepicker3.css'
            //'bootstrap3-dialog/dist/css/bootstrap-dialog.css'
        ],
        'resources/assets/css/vendor.css',
        'vendor/bower/'
    );

    mix.styles(
        [
            'vendor.css',
            'select.dataTables.css'
        ],
        'public/assets/css/hospital.css',
        'resources/assets/css/'
    );

    mix.cssmin('public/assets/css/hospital.css', 'public/assets/css/');

    mix.remove([
        'resources/assets/css/select.dataTables.css',
        'resources/assets/css/select.dataTables.css.map',
        'resources/assets/css/buttons.dataTables.css',
        'resources/assets/css/buttons.dataTables.css.map',
        'resources/assets/sass/datatables-select',
        'resources/assets/sass/datatables-buttons',
        'resources/assets/js/vendor.js',
        'resources/assets/js/vendor.js.map',
        'resources/assets/css/vendor.css',
        'resources/assets/css/vendor.css.map'
    ]);
});
