'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var path = require('path');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the finest ' + chalk.red('generator-test-g') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      //Defaults to the project's folder name if the input is skipped
      default: this.appname
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {

    // var self = this;
    // //Server Files
    //
    // this.fs.copyTpl(
    //   this.templatePath('_bower.json'),
    //   this.destinationPath('bower.json'), {
    //     name: this.props.name.toLowerCase()
    //   }
    // );
    //
    // this.fs.copy(
    //   this.templatePath('_bowerrc'),
    //   this.destinationPath('._bowerrc')
    // );
    //
    //
    // this.fs.copy(
    //   this.templatePath('.gitignore'),
    //   this.destinationPath('.gitignore')
    // );
    //
    // this.fs.copy(
    //   this.templatePath('_gulpfile.js'),
    //   this.destinationPath('gulpfile.js')
    // );
    //
    // this.fs.copyTpl(
    //   this.templatePath('_package.json'),
    //   this.destinationPath('package.json'), {
    //     name: this.props.name.toLowerCase()
    //   }
    // );
    //
    // this.fs.copyTpl(
    //   this.templatePath('_README.md'),
    //   this.destinationPath('README.md'), {
    //     name: this.props.name
    //   }
    // );
    //
    //
    // // Server
    //
    // this.fs.copy(
    //   this.templatePath('_server/_api/_user/_index.js'),
    //   this.destinationPath('server/api/user/index.js')
    // );
    //
    // this.fs.copy(
    //   this.templatePath('_server/_api/_user/_user.model.js'),
    //   this.destinationPath('server/api/user/user.model.js')
    // );
    //
    // this.fs.copy(
    //   this.templatePath('_server/_api/_user/_user.controller.js'),
    //   this.destinationPath('server/api/user/user.controller.js')
    // );
    //
    // this.fs.copy(
    //   this.templatePath('_server/_api/_user/_user.validation.schema.js'),
    //   this.destinationPath('server/api/user/user.validation.schema.js')
    // );
    //
    //
    // this.fs.copy(
    //   this.templatePath('_server/_auth/_facebook/_index.js'),
    //   this.destinationPath('server/auth/facebook/index.js')
    // );
    //
    //
    // this.fs.copy(
    //   this.templatePath('_server/_auth/_facebook/_passport.js'),
    //   this.destinationPath('server/auth/facebook/passport.js')
    // );
    //
    //
    // this.fs.copy(
    //   this.templatePath('_server/_auth/_google/_passport.js'),
    //   this.destinationPath('server/auth/google/passport.js')
    // );
    //
    //
    // this.fs.copy(
    //   this.templatePath('_server/_auth/_google/_index.js'),
    //   this.destinationPath('server/auth/google/index.js')
    // );
    //
    // this.fs.copy(
    //   this.templatePath('_server/_auth/_local/_passport.js'),
    //   this.destinationPath('server/auth/local/passport.js')
    // );
    //
    //
    // this.fs.copy(
    //   this.templatePath('_server/_auth/_local/_index.js'),
    //   this.destinationPath('server/auth/local/index.js')
    // );
    //
    //
    // this.fs.copy(
    //   this.templatePath('_server/_auth/_local/_index.js'),
    //   this.destinationPath('server/auth/local/index.js')
    // );
    //
    // this.fs.copy(
    //   this.templatePath('_server/_config/_environment/_index.js'),
    //   this.destinationPath('server/config/environment/index.js')
    // );
    //
    // this.fs.copy(
    //   this.templatePath('_server/_config/_express.js'),
    //   this.destinationPath('server/config/express.js')
    // );
    //
    //
    // this.fs.copy(
    //   this.templatePath('_server/_utils/_request.validator.js'),
    //   this.destinationPath('server/utils/request.validator.js')
    // );
    //
    //
    //
    //
    // this.fs.copyTpl(
    //   this.templatePath('_client/_app/_auth/_'),
    //   this.destinationPath('client/app/auth'), {
    //     name: this.props.name.toLowerCase()
    //   }
    // );
    //
    //
    //
    // fs.readdir('_client/_app/_auth', function(err, files) {
    //   files.forEach(function(file) {
    //     self.fs.copyTpl(
    //       self.templatePath('_client/_app/_auth/' + file),
    //       self.destinationPath('client/app/auth/' + file.replace("_", "")), {
    //         name: self.props.name.toLowerCase()
    //       }
    //     );
    //   });
    // })

    const dirFiles = getDirFiles(path.join(__dirname, 'templates'));

    var self = this;
    //Server Files

    dirFiles.forEach(function(filePair){
      self.fs.copyTpl(
        self.templatePath(filePair[0]),
        self.destinationPath(filePair[1]), {
          name: self.props.name
        }
      );
    })
  },

  install: function () {
    this.installDependencies();
  }
});


// Copied from http://stackoverflow.com/a/26828357/ and modified
const getDirFiles = function(directoryName){
  var dirFiles = [];
  const walk = function(directoryName) {
    try{
      var files = fs.readdirSync(directoryName);
      files.forEach(function(file) {
        var fullPath = path.join(directoryName,file);
        try{
          var f = fs.statSync(fullPath);
          if (f.isDirectory()) {
            walk(fullPath);
          } else {
            fullPath = fullPath.split("templates/")[1];   // remove the part before templates/ from the absolute path
            dirFiles.push([fullPath, fullPath.split("_").join("")]); // source and destination paths
            return;
          }
        }
        catch (err){
          console.log(err);
          return;
        }
      });
    }
    catch (err) {
      console.log(err);
      return;
    }
  };
  walk(directoryName);
  return(dirFiles);
}


