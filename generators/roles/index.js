'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const fs = require('fs');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super ' + chalk.red('generator-ansible-playbook') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Qual o nome da Sua Role?',
        default: 'default'
      },
      {
        type: 'checkbox',
        name: 'options',
        message: 'Escolha as Opções das Role',
        choices: [
          {
            value: 'files',
            name: 'files',
            checked: false
          },
          {
            value: 'handlers',
            name: 'handlers',
            checked: true
          },
          {
            value: 'library',
            name: 'library',
            checked: false
          },
          {
            value: 'lookupPlugins',
            name: 'lookup_plugins',
            checked: false
          },
          {
            value: 'meta',
            name: 'meta',
            checked: false
          },
          {
            value: 'moduleUtils',
            name: 'module_utils',
            checked: false
          },
          {
            value: 'tasks',
            name: 'tasks',
            checked: true
          },
          {
            value: 'templates',
            name: 'templates',
            checked: true
          },
          {
            value: 'vars',
            name: 'vars',
            checked: false
          }
        ],
        default: [
          {
            value: 'templates',
            name: 'templates',
            checked: true
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;

      this.check = function (diretory) {
        return props.options.indexOf(diretory) !== -1;
      };
    });
  }

  writing() {
    if (!fs.existsSync(path.join('roles'))) {
      console.log('Diretório não existe');
      return;
    }

    if (this.check('files')) {
      this.fs.copy(
        this.templatePath('files/**'),
        this.destinationPath(path.join('roles', this.props.name, 'files'))
      );
    }

    if (this.check('handlers')) {
      this.fs.copy(
        this.templatePath('handlers/**'),
        this.destinationPath(path.join('roles', this.props.name, 'handlers'))
      );
    }

    if (this.check('library')) {
      this.fs.copy(
        this.templatePath('library/**'),
        this.destinationPath(path.join('roles', this.props.name, 'library'))
      );
    }

    if (this.check('lookupPlugins')) {
      this.fs.copy(
        this.templatePath('lookup_plugins/**'),
        this.destinationPath(path.join('roles', this.props.name, 'lookup_plugins'))
      );
    }

    if (this.check('meta')) {
      this.fs.copy(
        this.templatePath('meta/**'),
        this.destinationPath(path.join('roles', this.props.name, 'meta'))
      );
    }

    if (this.check('moduleUtils')) {
      this.fs.copy(
        this.templatePath('module_utils/**'),
        this.destinationPath(path.join('roles', this.props.name, 'module_utils'))
      );
    }

    if (this.check('tasks')) {
      this.fs.copy(
        this.templatePath('tasks/**'),
        this.destinationPath(path.join('roles', this.props.name, 'tasks'))
      );
    }

    if (this.check('templates')) {
      this.fs.copy(
        this.templatePath('templates/**'),
        this.destinationPath(path.join('roles', this.props.name, 'templates'))
      );
    }

    if (this.check('vars')) {
      this.fs.copy(
        this.templatePath('vars/**'),
        this.destinationPath(path.join('roles', this.props.name, 'vars'))
      );
    }
  }
};
