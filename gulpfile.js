const conf = {
    // html
    htmlMin:         false,
    // css
    cssMin:          true,
    cssPurge:        false,
    cssRejected:     true,
    cssAutoPrefix:   true,
    cssSourceMaps:   false,
    // JavaScript
    jsMin:           true,
    jsBabel:         true,
    jsSourceMaps:    false,
    // tiny png',
    tinypng:         true,
    tinypngKey:      ['Mk1NnP5T4c9M831s1HY865hnRSfrJJHq'],
    // gulp
    showGulpedFiles: false,
    // Folder names
    path:            {
        dest: 'usnativeplants/public',
        dev:  'dev',
        js:   'javascripts',
        img:  'images',
        css:  'stylesheets',
    },
    purgeCssWhitelist: [

    ],
};

// Require the gulp components
const { src, dest, watch, series, parallel } = require('gulp');

// Require file system
const fs = require('fs');

// This is the only plugin we will require which loads other plugins automatically by using a '$' sign
const $ = require('gulp-load-plugins')({ overridePattern: true, pattern: ['gulp{-,.}*', 'browser-*', 'file-*', '*'] });

const purgecss = require('@fullhuman/postcss-purgecss');

/**
 * selects randomly from an array
 * @param {array} arr
 * @returns {number}
 */
function getRandFromArr(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Replaces the found string with the matching file contents
 * @param {String} p1
 * @param {String} match Match a string
 */
function replaceMatch(p1, match) {
    const file = `${conf.path.dev}/${match.trim()}`;
    if (fs.existsSync(file))
        return fs.readFileSync(file, 'utf8');
    return `<div style="position: fixed; top: 20px; left: 20px; background: #dc3545; color: #fff; padding: 5px 10px; z-index: 9999"><b>${file} -</b> does not exists.</div>`;
}

/**
* Used to sync deleting and renaming files
* @param {String} action Action taken on the file
* @param {String} path Path of the file
*/
function fileSync(action, path) {
    const devPath = $.path.relative($.path.resolve(conf.path.dev), path);
    const destPath = $.path.resolve(conf.path.dest, devPath);
    if (fs.existsSync(destPath)) {
        if (action === 'unlink')
            fs.unlinkSync(destPath);
        if (action === 'change')
            $.rename(destPath);
    }
}

/**
 * Run a gulp file task
 * @param {String} glob Gulp file selector
 * @param {String} destPath Destination sub-folder
 * @param {Boolean} changedContents Should we check for content or time changed
 */
function gulpFiles(glob, destPath, changedContents) {
    glob = glob || '';
    destPath = destPath ? `${destPath}/` : '';
    changedContents = changedContents ? $.changed.compareContents : $.changed.compareLastModifiedTime;
    // create easy to use 'is' object
    const is = {
        sass: glob.includes('.scss'),
        html: glob === '.html',
        js:   glob === '.js',
    };

    // set up the source of our files, include glob while ignoring other stuff
    const source = [
        `${conf.path.dev}/${destPath}**/*${glob}`,
        `!${conf.path.dev}/**/*.tpl.html`, // ignore html tpl files
        `!${conf.path.dev}/**/*.map`, // ignore map files
        `!${conf.path.dev}/**/*package-lock.json`, // ignore package lock files
        `!${conf.path.dev}/**/*package.json`, // ignore package files
        `!${conf.path.dev}/**/*gulpfile.js`, // ignore gulp files
        `!${conf.path.dev}/**/*.md`, // ignore read me files
        `!${conf.path.dev}/**/node_modules{,/**}`, // ignore node module folders
    ];

    // return
    return src(source)
    // Global Plumber
        .pipe($.plumber({ errorHandler: $.notify.onError({ message: `❌ ${glob.replace(/[^a-zA-Z0-9,]/g, '').toUpperCase()}: <%= error.message %>` }) }))
    // Global Debug
        .pipe($.debug({ title: glob.replace(/[^a-zA-Z0-9,]/g, '').toUpperCase(), showFiles: conf.showGulpedFiles }))
    // Check if changed and not a folder
        .pipe($.if(f => !f.isDirectory(), $.changed(conf.path.dest, { hasChanged: changedContents })))
    // Sass
        .pipe($.if(is.sass && conf.cssSourceMaps, $.sourcemaps.init()))
        .pipe($.if(is.sass, $.sass().on('error', $.sass.logError)))
        .pipe($.if(is.sass, $.postcss([
            conf.cssAutoPrefix && $.autoprefixer({ cascade: false }),
            conf.cssMin && $.cssnano(),
            conf.cssPurge && purgecss({ content: [`${conf.path.dev}/**/*.{html,php}`], whitelist: conf.purgeCssWhitelist, rejected: true }),
            $.postcssCombineMediaQuery(),
        ].filter(Boolean))))
        .pipe($.if(is.sass && conf.cssMin, $.rename({ extname: '.min.css' })))
        .pipe($.if(is.sass && conf.cssSourceMaps, $.sourcemaps.write('.')))
    // JavaScript
        .pipe($.if(is.js && conf.jsSourceMaps, $.sourcemaps.init()))
        .pipe($.if(is.js && conf.jsBabel, $.babel({ presets: ['@babel/preset-env'],  plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'createJSXElement' }]] })))
        .pipe($.if(is.js && conf.jsMin, $.uglify()))
        .pipe($.if(is.js && conf.jsMin, $.rename({ extname: '.min.js' })))
        .pipe($.if(is.js && conf.jsSourceMaps, $.sourcemaps.write('.')))
    // Minify png/jpg/svg
        .pipe($.if(conf.tinypng && (f => ['.png', '.jpg', '.jpeg'].includes(f.extname)), $.tinypngCompress({ key: getRandFromArr(conf.tinypngKey), sigFile: './.tinypng-sig', summarize: true })))
        .pipe($.if(f => f.extname === '.svg', $.svgo()))
    // HTML
        .pipe($.if(is.html, $.replace(/<!-- @import(.*?) -->/g, replaceMatch)))
        .pipe($.if(is.html && conf.htmlMin, $.htmlmin({ collapseWhitespace: true })))
    // Destination to save
        .pipe(dest(`${conf.path.dest}/${destPath}`))
    // Browser stream
        // .pipe($.browserSync.stream())
    // Notify
        .pipe($.notify({ title: glob.replace(/[^a-zA-Z0-9,]/g, '').toUpperCase(), message: '✅ Task completed!', onLast: true }));
}


/**
* Use BrowserSync
*/
function bSync() {
    const options = {
        watch:          true,
        injectChanges:  true,
        ghostMode:      false,
        snippetOptions: {
            rule: {
                match: /<\/body>/i,
                fn:    (snippet, match) => snippet + match,
            },
        },
        server: {
            baseDir: conf.path.dest,
            index:   'index.html',
        },
        port: 3000,
    };
    $.browserSync.init(options);
}



// Processed Files
exports.js       = function js() { return gulpFiles('.js', conf.path.js); };
exports.sass     = function sass() { return gulpFiles('[^_]*.scss', conf.path.css); };
exports.img      = function img() { return gulpFiles('.{png,jpg,jpeg,gif,svg}', conf.path.img); };
// Straight copy
exports.ico      = function ico() { return gulpFiles('favicon.ico', '', true); };
exports.html     = function html() { return gulpFiles('.html', '', true); };

/**
* We watch for changes.
*/
function watchMe() {
    watch(`${conf.path.dev}/**/*.html`, exports.html);
    watch(`${conf.path.dev}/**/*.scss`, exports.sass);
    watch(`${conf.path.dev}/**/*.js`, exports.js);
    watch(`${conf.path.dev}/favicon.ico`, exports.ico);
    watch(`${conf.path.dev}/**/*.{png,jpg,jpeg,gif,svg,ico}`, exports.img);
    watch(`${conf.path.dev}/**/*`).on('all', fileSync);
    // $.browserSync.reload();
}

// Export tasks
exports.watch = watchMe;
exports.browser = parallel(bSync, exports.watch);
exports.default = series(
    exports.html,
    exports.js,
    exports.sass,
    exports.img,
    exports.ico,

    exports.watch,
    // exports.browser,
);
