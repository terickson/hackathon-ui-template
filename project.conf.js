/*
 * We declare some properties in variables here so that they can be referenced throughout the rest of the configuration.
 */
var depDir = 'node_modules',
    sourceDir = 'src',
    outputDir = 'dist';

module.exports = {
    depDir: depDir,
    /*
     * The directory for web source files, especially JavaScript and CSS. The related tasks will primarily search
     * here for files.
     */
    sourceDir: sourceDir,
    /*
     * The directory in which the finished web application will be generated. JavaScript files will be concatenated
     * into here, LESS files will be compiled into CSS and placed here, asset files will be copied here, etc.
     */
    outputDir: outputDir,
    /*
     * This is the path that will be used when the application runs locally, e.g. if basePageName = yourApp, then the
     * local URL will be http://localhost:3456/yourApp
     */
    basePageName: 'ui-template',
    /*
     * We'll use a single Angular module for the application. We may still pull in multiple modules from external
     * libraries, but our entire application will be one.
     */
    appModule: {
        /*
         * The name of the Angular application module. This should match the value of your `ng-app` directive in
         * your index.html.
         */
        name: 'ui-template',

        /*
         * Module dependencies. The Angular application module will depend on these modules.
         *
         * Remember that Angular modules are different than Angular components like controllers and services. For
         * instance, When using the Restangular library, the module is named `restangular` and should be included in
         * this list. The component is named `Restangular` (with a capital 'R') and should be injected into
         * other controllers, services, etc. that need to use Restangular.
         */
        includes: [
            'ngTouch',
            'ngResource',
            'ngAnimate',
            'ngSanitize',
            'templates-main',
            'ui.router',
            'ui.bootstrap.tooltip',
            'ui.bootstrap.rating',
            'ui.bootstrap.typeahead',
            'angular-sortable-view',
            'mentio',
            'ngEmoticons',
            'monospaced.elastic',
            'yaru22.md',
            'btford.socket-io'
            ]
    },

    /*
     * We recognize two types of JavaScript files: internal and external.
     *
     * Internal files are specific to this project and will be concatenated into 'dist/internal.js'. These files
     * will have access to the `appModule` variable representing the Angular application module.
     *
     * External files will be concatenated into `dist/third-party.js`. These should be third-party libraries like
     * Angular.
     *
     * `third-party.js` will be loaded before `internal.js`. Files will be concatenated into their destination in
     * the order in which they appear in the following arrays.
     *
     * Any JavaScript file ending in `Spec.js` will be excluded. This means that we can include tests right next
     * to the files under test without worrying about them ending up in our final distributable.
     */
    javaScriptFiles: {
        internal: [
            sourceDir + '/**/*.js'
        ],
        external: [
            depDir + '/jquery/dist/jquery.js',
            depDir + '/socket.io-client/socket.io.js',
            depDir + '/angular/angular.js',
            depDir + '/angular-animate/angular-animate.js',
            depDir + '/angular-elastic/elastic.js',
            depDir + '/angular-md/dist/angular-md.js',
            depDir + '/angular-resource/angular-resource.js',
            depDir + '/angular-sanitize/angular-sanitize.js',
            depDir + '/angular-sanitize/angular-sanitize.js',
            depDir + '/angular-sortable-view/src/angular-sortable-view.js',
            depDir + '/angular-touch/angular-touch.js',
            depDir + '/angular-ui-bootstrap/src/bindHtml/bindHtml.js',
            depDir + '/angular-ui-bootstrap/src/position/position.js',
            depDir + '/angular-ui-bootstrap/src/rating/rating.js',
            depDir + '/angular-ui-bootstrap/src/tooltip/tooltip.js',
            depDir + '/angular-ui-bootstrap/src/typeahead/typeahead.js',
            depDir + '/angular-ui-router/release/angular-ui-router.js',
            depDir + '/bootstrap/js/dropdown.js',
            depDir + '/lodash/index.js',
            depDir + '/marked/lib/marked.js',
            depDir + '/ment.io/dist/mentio.js',
            depDir + '/moment/moment.js',
            depDir + '/ng-emoticons/dist/ng-emoticons.min.js',
            depDir + '/release-notes/dist/release-notes.js',
            depDir + '/sugar/release/sugar-full.development.js',
            depDir + '/angular-socket-io/socket.js'
        ]
    },
    /*
     * Angular partials will be collected using html2js into a single script file.
     * This means that they can be eagerly loaded in one server call, that they are available to tests
     * and that we can more easily cache-bust them.
     */
    html2js: {
        templateFiles: [sourceDir + '/**/*.html', '!' + sourceDir + '/index.html'],
        outputFile: outputDir + '/templates.js'
    },
    /*
     * We assume that we are compiling a single LESS file into a single 'app.css' file in the outputDir.
     * This root file should @include any other LESS or CSS files we may want.
     */
    rootLessFile: sourceDir + '/styles/app.less',
    /*
     * Enables live reloading of browser when changes to HTML, JavaScript, and LESS files are made.
     */
    livereload: true,
    /*
     * Name of generated war file for deployment
     */
    warName: 'ui-template',
    warDir: 'target'
};
