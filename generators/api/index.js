'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var camelCase = require('camelcase');

module.exports = Generator.extend({

  constructor: function(args, opts) {
    // super(args, opts);
    Generator.apply(this, arguments);

    this.argument('apiname', { type: String, required: true });
    this.log(yosay(
      this.appname + 'You called the api subgenerator with the argument ' + this.options.apiname + '. Creating directories.'
    ));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('_index.js'),
      this.destinationPath('server/api/' + this.options.apiname.toLowerCase() + '/'+this.options.apiname.toLowerCase()+'.index.js')
    );

    this.fs.copyTpl(
      this.templatePath('_model.js'),
      this.destinationPath('server/api/' + this.options.apiname.toLowerCase() + '/'+this.options.apiname.toLowerCase()+'.model.js'),
      {
        nameCamelCase : camelCase(this.options.apiname)
      }
    );

    this.fs.copy(
      this.templatePath('_controller.js'),
      this.destinationPath('server/api/' + this.options.apiname.toLowerCase() + '/'+this.options.apiname.toLowerCase()+'.controller.js')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
