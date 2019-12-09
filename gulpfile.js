var gulp = require("gulp");
var del = require('del');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var expect = require('gulp-expect-file');
var supportedfonts = [
    'node_modules/**/fonts/*.woff',
    'node_modules/**/fonts/*.woff2',
    'node_modules/**/fonts/*.eot',
    'node_modules/**/fonts/*.svg',
    'node_modules/**/fonts/*.ttf',
    'node_modules/**/fonts/*.otf'
];

var packages = [
    {
        inputFiles: [
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/font-awesome/css/font-awesome.css',
            'css/Core.css'
        ],
        iscss: true,
        outputFileName: 'Core.min.css'
    },
    {
        inputFiles: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
            'node_modules/nprogress/nprogress.js',
            'node_modules/jquery.easing/jquery.easing.js',
            'node_modules/jquery-validation/dist/jquery.validate.js',
            'node_modules/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.js',
            'node_modules/clipboard/dist/clipboard.js',
            'node_modules/jquery-disable-with/src/jquery-disable-with.js',
            'node_modules/jquery-utc-time/src/jquery-utc-time.js',
            'node_modules/jquery-anything-clickable/src/jquery-anything-clickable.js',
            'js/Core.js'
        ],
        iscss: false,
        outputFileName: 'Core.min.js'
    },
    {
        inputFiles: [
            'node_modules/primer/build/build.css',
            'css/Product.css'
        ],
        iscss: true,
        outputFileName: 'Product.min.css'
    },
    {
        inputFiles: [
            'node_modules/datatables/media/css/jquery.dataTables.css',
            'node_modules/primer-markdown/build/build.css',
            'node_modules/github-syntax-light/lib/github-light.css',
            'css/Dashboard.css'
        ],
        iscss: true,
        outputFileName: 'Dashboard.min.css'
    },
    {
        inputFiles: [
            'node_modules/startbootstrap-sb-admin/js/sb-admin.js',
            'node_modules/datatables/media/js/jquery.dataTables.js',
            'js/Dashboard.js'
        ],
        iscss: false,
        outputFileName: 'Dashboard.min.js'
    },
]

gulp.task('clean', function (done) {
    del('dist/**/*');
    del('fonts/**/*');
    done();
});

gulp.task('copy-fonts', function () {
    return gulp.src(supportedfonts)
        .pipe(flatten())
        .pipe(gulp.dest('fonts'));
})

gulp.task('css', function (done) {
    packages.filter(t => t.iscss).forEach(function (package) {
        gulp.src(package.inputFiles)
            .pipe(expect(package.inputFiles))
            .pipe(concat('temp'))
            .pipe(cleancss())
            .pipe(rename(package.outputFileName))
            .pipe(gulp.dest('dist'));
    });
    done();
});

gulp.task('js', function (done) {
    packages.filter(t => !t.iscss).forEach(function (package) {
        gulp.src(package.inputFiles)
            .pipe(expect(package.inputFiles))
            .pipe(concat('temp'))
            .pipe(uglify())
            .pipe(rename(package.outputFileName))
            .pipe(gulp.dest('dist'));
    });
    done();
});

gulp.task('default', gulp.series('clean', 'copy-fonts', 'css', 'js'));