var fs = require('fs');

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-text-replace');

    function loadTemplate(filename, data) {
        // We have to use a sync method because this function needs to return synchronously
        var templateText = fs.readFileSync(__dirname + '/' + filename, {encoding: 'utf8'});
        return grunt.template.process(templateText, {data: data});
    }

    var projectConfigFile = './project.conf.js',
        tempDir = 'temp',
        moduleDefFile = tempDir + '/moduleDefinition.js',
        projectConfig = require(projectConfigFile),
        concatBanner = loadTemplate('gruntacular/functionOpen.js', {}),
        concatFooter = loadTemplate('gruntacular/functionClose.js', {});

    grunt.initConfig({
        basePageName : projectConfig.basePageName,
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        projectConfig.outputDir + '**'
                    ]
                },
                options: {
                    watchTask: true,
                    proxy: 'http://localhost:8000/<%= basePageName %>',
                    ghostMode: {
                        links: false
                    }
                }
            }
        },
        clean: {
            outputDir: [projectConfig.outputDir, 'temp']
        },
        concat: {
            internal: {
                src: [moduleDefFile].concat(projectConfig.javaScriptFiles.internal).concat(["!**/*Spec.js"]),
                dest: projectConfig.outputDir + "/internal.js",
                options: {
                    /*
                     * Wrap the entire app in a module function.
                     * Also: define a single Angular module with name and includes from project.conf.js.
                     * This feels hacky at first, but it greatly simplifies dependency management.
                     */
                    banner: concatBanner,
                    footer: concatFooter,
                    process: function (src, filepath) {
                        if (filepath === moduleDefFile) {
                            /*
                             * Don't wrap the module definition in a closure since we want it available to everything
                             * internal.
                             */
                            return src;
                        }
                        /*
                         * Wrap our files in closures so that we don't accidentally leak between them.
                         */
                        // Are these closures really necessary if we're writing everything in ng modules?
                        return "(function () {\n" + src + "\n}());";
                    }
                }
            },
            "third-party": {
                src: projectConfig.javaScriptFiles.external.concat(["!**/*Spec.js"]),
                dest: projectConfig.outputDir + "/third-party.js"
            }
        },
        copy: {
            "release-notes": {
                files: [
                    {
                        cwd: ".",
                        src: ['releaseNotes.md'],
                        dest: projectConfig.outputDir,
                        expand: true
                    }
                ]
            },
            "font-awesome-files": {
                files: [
                    {
                        cwd: projectConfig.depDir + "/font-awesome/fonts/",
                        src: ['**'],
                        dest: projectConfig.outputDir + "/fonts/",
                        expand: true
                    }
                ]
            },
            "flat-icon-files": {
                files: [
                    {
                        cwd: projectConfig.sourceDir + '/flaticon/',
                        src: ['**'],
                        dest: projectConfig.outputDir + "/fonts/",
                        expand: true
                    }
                ]
            },
            "ui-bootstrap-html": {
                files: [
                    {
                        cwd: projectConfig.depDir + "/angular-ui-bootstrap/template/",
                        src: ['rating/rating.html', 'tooltip/tooltip-popup.html', 'typeahead/typeahead-match.html', 'typeahead/typeahead-popup.html'],
                        dest: projectConfig.sourceDir + "/template/",
                        expand: true
                    }
                ]
            },
            "glyph-icons": {
                files: [
                    {
                        cwd: projectConfig.depDir + "/bootstrap/fonts/",
                        src: ['**'],
                        dest: projectConfig.outputDir + "/fonts/",
                        expand: true
                    }
                ]
            },
            "index": {
                files: [
                    {
                        cwd: projectConfig.sourceDir + '/application/',
                        src: ['index.html'],
                        dest: projectConfig.outputDir,
                        expand: true
                    }
                ],
                options: {
                    process: addCacheBustingToGeneratedFileReferences
                }
            },
            "browser-support-images": {
                files: [
                    {
                        cwd: projectConfig.depDir + "/browser-detector/src/img/",
                        src: ['**'],
                        dest: projectConfig.outputDir + "/images/",
                        expand: true
                    }
                ]
            },
            "emoji-images": {
                files: [
                    {
                        cwd: projectConfig.depDir + "/ng-emoticons/images",
                        src: ["*.png"],
                        dest: projectConfig.outputDir + "/img/",
                        expand: true
                    }
                ]
            },
            "assets": {
                files: [
                    {
                        cwd: projectConfig.sourceDir + "/img/",
                        src: ["**"],
                        dest: projectConfig.outputDir + "/images/",
                        expand: true
                    }
                ]
            }
        },
        'gh-pages': {
            options: {
                base: projectConfig.outputDir
            },
            src: ['**']
        },
        html2js: {
            options: {
                fileHeaderString: '(function (angular) {\n"use strict";\n',
                fileFooterString: '}(window.angular));'
            },
            main: {
                src: projectConfig.html2js.templateFiles,
                dest: projectConfig.html2js.outputFile
            }
        },
        jshint: {
            report: {
                files: {
                    src: ['Gruntfile.js', projectConfig.sourceDir + '/**/*.js', '/qa/**/*.js']
                },
                options: {
                    jshintrc: '.jshintrc',
                    reporter: 'checkstyle',
                    reporterOutput: 'out/checkstyle.xml'
                }
            },
            commandLine: {
                options: {
                    jshintrc: './.jshintrc',
                    force: true
                },
                files: {
                    src: ['Gruntfile.js', projectConfig.sourceDir + '/**/*.js', '/qa/**/*.js']
                }
            }
        },
        less: {
            all: {
                src: projectConfig.rootLessFile,
                dest: projectConfig.outputDir + '/app.css',
                options: {
                    compress: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapFilename: projectConfig.outputDir + '/app.css.map',
                    sourceMapURL: 'app.css.map'
                }
            }
        },
        ngAnnotate: {
            internal: {
                expand: true,
                cwd: projectConfig.outputDir,
                src: ['internal.js'],
                dest: projectConfig.outputDir
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({ browsers: 'last 2 versions' })
                ]
            },
            dist: {
                src: projectConfig.outputDir + '/app.css'
            }
        },
        uglify: {
            /*
             * 'Beautify' the internal.js file for better readability. Even though we're mangling the final output,
             * it improves the source map.
             */
            beautify: {
                options: {
                    beautify: true,
                    mangle: false
                },
                files: [
                    {
                        expand: true,
                        cwd: projectConfig.outputDir,
                        src: 'internal.js',
                        dest: projectConfig.outputDir
                    }
                ]
            },
            all: {
                options: {
                    sourceMap: true
                },
                files: [
                    {
                        expand: true,
                        cwd: projectConfig.outputDir,
                        src: '**/*.js',
                        dest: projectConfig.outputDir
                    }
                ]
            }
        },
        watch: {
            less: {
                files: [projectConfig.sourceDir + "/**/*.less"],
                tasks: 'css'
            },
            templates: {
                files: projectConfig.html2js.templateFiles,
                tasks: 'html2js'
            },
            "js-internal": {
                files: projectConfig.javaScriptFiles.internal.concat([moduleDefFile]),
                tasks: ['jshint:commandLine', 'concat:internal']
            },
            "js-third-party": {
                files: projectConfig.javaScriptFiles.external,
                tasks: 'concat:third-party'
            },
            index: {
                files: [
                    projectConfig.sourceDir + '/index.html',
                    projectConfig.outputDir + '/*.*', // all generated files (but not directories)
                    '!' + projectConfig.outputDir + '/index.html' // don't re-run when index.html updates
                ],
                tasks: 'copy:index',
                options: {
                    livereload: projectConfig.livereload
                }
            },
            'project-config': {
                files: ['project.conf.js'],
                tasks: ['reload-project-config', 'compile']
            }
        },
        replace: {
          restBase: {
            src: projectConfig.outputDir+'/internal.js',
            overwrite: true,                 // overwrite matched source files
            replacements: [{
              from: /\('restBaseUrl', '.*'\);/g,
              to: "('restBaseUrl', 'http://ciscoHackathon2016.cloudapp.net:5000/');"
            }]
          },
          envCheck: {
            src: projectConfig.outputDir+'/third-party.js',
            overwrite: true,                 // overwrite matched source files
            replacements: [{
              from: "$location.host().split('.')[0],",
              to: "$location.host(),"
            }]
          }
        },        
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: projectConfig.outputDir,
                    middleware: function (connect, options) {
                        var basePageName = grunt.template.process('/<%= basePageName %>');
                        return [
                            connect().use(basePageName, connect.static(options.base[0]))
                        ];
                    },
                    livereload: projectConfig.livereload
                }
            },
            autoopen: {
                options: {
                    port: 8000,
                    base: projectConfig.outputDir,
                    open: {
                        target: 'http://localhost:8000/<%= basePageName %>'
                    },
                    middleware: function (connect, options) {
                        var basePageName = grunt.template.process('/<%= basePageName %>');
                        return [
                            connect().use(basePageName, connect.static(options.base[0]))
                        ];
                    },
                    livereload: projectConfig.livereload
                }
            }
        }
    });

    // Composite Tasks
    grunt.registerTask('css', ['less', 'postcss']);
    grunt.registerTask('compile', ['clean', 'create-module-definition', 'concat', 'css', 'copy:ui-bootstrap-html', 'html2js', 'copy', 'jshint:commandLine' ]);
    grunt.registerTask('optimize', ['ngAnnotate', 'uglify:beautify', 'uglify:all']);
    grunt.registerTask('package', ['compile', 'replace:restBase', 'replace:envCheck', 'optimize']);
    grunt.registerTask('analyze', ['jshint:report']);
    grunt.registerTask('release', ['package', 'gh-pages']);
    grunt.registerTask('cit', ['package']);
    grunt.registerTask('sync', ['compile', 'connect:server', 'browserSync', 'watch']);
    grunt.registerTask('serve', ['compile', 'connect:autoopen', 'watch']);
    grunt.registerTask('dev', ['compile', 'connect:autoopen', 'watch']);
    grunt.registerTask('default', ['cit']);

    grunt.registerTask('reload-project-config',
        'Reload the project configuration after changes to project.conf.js',
        function () {
            projectConfig = require(projectConfigFile);
        });

    grunt.registerTask('create-module-definition',
        'Use the information in project.conf.js to create a moduleDefinition.js file',
        function () {
            var moduleDefinition = loadTemplate('gruntacular/moduleDefinition.js', projectConfig.appModule);
            grunt.file.write(moduleDefFile, moduleDefinition);
        }
    );

    /*
     * Add cache busting for generated files by appending "?c={timestamp}" to each generated file referenced from
     * index.html. This means that we'll always get an updated URL to each of our generated files and can
     * cache them indefinitely while avoiding cacheing bugs.
     */
    function addCacheBustingToGeneratedFileReferences(indexHtml) {
        var files = fs.readdirSync(projectConfig.outputDir);
        files.forEach(function (filename) {
            var fileReference = '="' + filename + '"';
            if (indexHtml.indexOf(fileReference) !== -1) {
                /*
                 * Ideally, we'd use the async version of these fs calls, but we can only invoke Grunt's async stuff
                 * from within a task (and we have to return the transformed file string from this function). It
                 * seems to remain under a millisecond, though.
                 */
                var stats = fs.statSync(projectConfig.outputDir + '/' + filename);
                /*
                 * We only seem to get second precision, so let's divide millisecond by 1000 to
                 * get a cleaner timestamp.
                 */
                var timestamp = stats.mtime.getTime() / 1000;
                var newFileReference = '="' + filename + '?c=' + timestamp + '"';
                indexHtml = indexHtml.replace(fileReference, newFileReference);
            }
        });
        return indexHtml;
    }
};
