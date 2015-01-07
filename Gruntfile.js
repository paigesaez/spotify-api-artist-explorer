module.exports = function (grunt) {
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// configure jshint to validate js files -----------------------------------
		jshint: {
			options: {
				reporter: require('jshint-stylish') // use jshint-stylish to format errors
			},
      main: ['Gruntfile.js', 'src/js/main.js']
		},

		// uglify js files -------------------------------------
		uglify: {
			options: {
				banner: '/*!\n <%= pkg.name %> <%= grunt.template.today("mm-dd-yyyy") %> \n*/\n'
			},
			main: {
				src: 'src/js/main.js',
				dest: 'js/main.min.js'
			}
		},
    
    sync: {
      materialdesign: {
        files: [{
          cwd: 'src/vendors/materialize/font/material-design-icons/',
          src: '**',
          dest: 'font/material-design-icons/'
        }],
        pretend: false,
        verbose: true
      },
      roboto: {
        files: [{
          cwd: 'src/vendors/materialize/font/roboto/',
          src: '**',
          dest: 'font/roboto/'
        }],
        pretend: false,
        verbose: true
      },
      js: {
        files: [{
          cwd: 'src/js/',
          src: '**',
          dest: 'js/'
        }],
        pretend: false,
        verbose: true
      }         
    },
  

    sass: { 
      expanded: {
        options: {
          style: 'expanded',
          noCache: true
        },
        files: {
          'css/materialize.css': 'src/vendors/materialize/sass/materialize.scss',
        }
      },

      min: {
        options: {
          style: 'compressed',
          noCache: true
        },
        files: {
          'css/materialize.min.css': 'src/vendors/materialize/sass/materialize.scss',
        }
      }
    },

		watch: {
			materialize: {
				files: [
          'src/vendors/materialize/sass/**/*'
				],
				tasks: ['sass']
			},      
			javascript: {
				files: [
					'src/js/main.js'
				],
				tasks: ['jshint', 'uglify', 'sync:js']
			}
		}    
    
    
    
	});
	

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sync');




  
  grunt.registerTask('default', ['jshint', 'uglify', 'sass', 'sync']);
};
