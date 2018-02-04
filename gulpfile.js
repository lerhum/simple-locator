var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');

// Paths
var scss = 'assets/scss/**/*';
var css = 'assets/css/';

var js_source = [
	// 'assets/js/source/simple-locator.js',
	//'assets/js/source/simple-locator-non-ajax-results.js',
	'assets/js/source/simple-locator.functions-deprecated.js',
	'assets/js/source/simple-locator.single-location.js',
	'assets/js/source/simple-locator.form.js',
	'assets/js/source/simple-locator.geocoder.js',
	'assets/js/source/simple-locator.results-map.js',
	'assets/js/source/simple-locator.results-list.js',
	'assets/js/source/simple-locator.infowindow-open.js',
	'assets/js/source/simple-locator.geolocation.js',
	'assets/js/source/simple-locator.places-autocomplete.js',
	'assets/js/source/simple-locator.default-map.js',
	'assets/js/source/simple-locator.all-locations.js',
	'assets/js/source/simple-locator.errors.js',
	'assets/js/source/simple-locator.factory.js'
];

var js_admin_source = [
	'assets/js/source/bs-transition.js',
	'assets/js/source/bs-modal.js',
	'assets/js/source/simple-locator-admin.js',
	'assets/js/source/simple-locator-import.js',
];

var js_admin_maps_source = 'assets/js/source/simple-locator-admin-maps.js';
var js_admin_defaultmap_source = 'assets/js/source/simple-locator-admin-defaultmap.js';
var js_admin_search_history_source = 'assets/js/source/simple-locator-admin-search-history.js';

var js_compiled = 'assets/js/';


/**
* Smush the admin Styles and output
*/
gulp.task('scss', function(callback){
	pump([
		gulp.src(scss),
		sass({ outputStyle: 'compressed' }),
		autoprefix('last 15 version'),
		gulp.dest(css),
		livereload(),
		notify('Simple Locator styles compiled & compressed.')
	], callback);
});

/**
* Admin JS
*/
gulp.task('admin_scripts', function(callback){
	pump([
		gulp.src(js_admin_source),
		concat('simple-locator-admin.js'),
		gulp.dest(js_compiled),
		uglify(),
		gulp.dest(js_compiled)
	], callback);
});

/**
* Admin Maps JS
*/
gulp.task('admin_maps_scripts', function(callback){
	pump([
		gulp.src(js_admin_maps_source),
		gulp.dest(js_compiled),
		uglify(),
		gulp.dest(js_compiled)
	], callback);
});

/**
* Admin Default Map
*/
gulp.task('admin_default_map_scripts', function(callback){
	pump([
		gulp.src(js_admin_defaultmap_source),
		gulp.dest(js_compiled),
		uglify(),
		gulp.dest(js_compiled)
	], callback);
});

/**
* Admin Search History Map
*/
gulp.task('admin_search_history', function(callback){
	pump([
		gulp.src(js_admin_search_history_source),
		gulp.dest(js_compiled),
		uglify(),
		gulp.dest(js_compiled)
	], callback);
});


/**
* Front end js
*/
gulp.task('scripts', function(callback){
	pump([
		gulp.src(js_source),
		concat('simple-locator.min.js'),
		gulp.dest(js_compiled),
		//uglify(),
		gulp.dest(js_compiled)
	], callback);
});


/**
* Watch Task
*/
gulp.task('watch', function(){
	livereload.listen();
	gulp.watch(scss, ['scss']);
	gulp.watch(js_source, ['scripts']);
	gulp.watch(js_admin_source, ['admin_scripts']);
	gulp.watch(js_admin_maps_source, ['admin_maps_scripts']);
	gulp.watch(js_admin_defaultmap_source, ['admin_default_map_scripts']);
	gulp.watch(js_admin_search_history_source, ['admin_search_history']);
});


/**
* Default
*/
gulp.task('default', [
	'scss', 
	'scripts', 
	'admin_scripts', 
	'admin_maps_scripts', 
	'admin_default_map_scripts',
	'admin_search_history',
	'watch'
]);