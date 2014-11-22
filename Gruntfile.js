module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  grunt.initConfig({
    watch: {
      html: {
        files: ['web/*.*', 'web/*/*.*', 'web/*/*/*.*',
          'web/scripts/data/*/*/*.*', 'web/scripts/data/*/*.*'
        ],
        options: {
          livereload: true
        },
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      css: {
        files: ['web/*.*']
      },
      compass: {
        files: ['web/styles/{,*/}*.{scss,sass}',
          'web/scss/{,*/}*.{scss,sass}'
        ],
        tasks: ['compass:server'],
        options: {
          debounceDelay: 1000,
          livereload: true
        }
      }
    },
    compass: {
      options: {
        sassDir: 'web/scss',
        cssDir: 'web/styles',
        fontsDir: 'web/styles/fonts',
        importPath: './bower_components',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
      },
      server: {
        options: {
          debugInfo: false,
          sourcemap: true,
          outputStyle: 'compressed'
        }
      }
    },
    concurrent: {
      server: ['compass:server']
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "web/scripts/data/",
          mainConfigFile: "web/scripts/data/main.js",
          name: "main",
          out: "web/dist/javascript/data.js"
        }
      }
    },
    connect: {
      liveroad: {
        options: {
          port: 9527,
          hostname: '*',
          livereload: 35729,
          open: {
            target: 'http://127.0.0.1:9527', //
          },
          useAvailabePort: true,
          middleware: function(connect) {
            return [
              connect.static('web'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static("web")
            ];
          }
        }
      }
    }
  })
  grunt.registerTask('default', ['connect', 'watch']); //打开服务器自动刷新
  grunt.registerTask('requirejs', ['requirejs:compile']); //压缩js文件
}
