'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the majestic ' + chalk.red('generator-ansible-playbook') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Qual o Nome do Seu PlayBook ?',
        default: 'playbook'
      },
      {
        type: 'checkbox',
        message: 'Escolha as Opções para serem adicionadas ao Playbook',
        name: 'option',
        choices: [
          {
            value: 'filter',
            name: 'filter_plugins',
            checked: false
          },
          {
            value: 'inventories',
            name: 'inventories',
            checked: false
          },
          {
            value: 'library',
            name: 'library',
            checked: false
          },
          {
            value: 'moduleUtils',
            name: 'module_utils',
            checked: false
          },
          {
            value: 'roles',
            name: 'roles',
            checked: true
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;

      this.check = function (diretory) {
        return props.option.indexOf(diretory) !== -1;
      };
    });
  }

  writing() {
    if (this.check('filter')) {
      this.fs.copy(
        this.templatePath('filter_plugins/.gitkeep'),
        this.destinationPath(this.props.name + '/filter_plugins/.gitkeep')
      );
    }

    if (this.check('inventories')) {
      this.fs.copy(
        this.templatePath('inventories/production/group_vars/group1'),
        this.destinationPath(this.props.name + '/inventories/production/group_vars/group1')
      );

      this.fs.copy(
        this.templatePath('inventories/production/host_vars/hostname1'),
        this.destinationPath(this.props.name + '/inventories/production/host_vars/hostname1')
      );

      this.fs.copy(
        this.templatePath('inventories/production/hosts'),
        this.destinationPath(this.props.name + '/inventories/production/hosts')
      );

      this.fs.copy(
        this.templatePath('inventories/staging/group_vars/group1'),
        this.destinationPath(this.props.name + '/inventories/staging/group_vars/group1')
      );

      this.fs.copy(
        this.templatePath('inventories/staging/host_vars/hostname1'),
        this.destinationPath(this.props.name + '/inventories/staging/host_vars/hostname1')
      );

      this.fs.copy(
        this.templatePath('inventories/staging/hosts'),
        this.destinationPath(this.props.name + '/inventories/staging/hosts')
      );
    }

    if (this.check('library')) {
      this.fs.copy(
        this.templatePath('library/.gitkeep'),
        this.destinationPath(this.props.name + '/library/.gitkeep')
      );
    }

    if (this.check('moduleUtils')) {
      this.fs.copy(
        this.templatePath('module_utils/.gitkeep'),
        this.destinationPath(this.props.name + '/module_utils/.gitkeep')
      );
    }

    if (this.check('roles')) {
      this.fs.copy(
        this.templatePath('roles/common/.gitkeep'),
        this.destinationPath(this.props.name + '/roles/common/.gitkeep')
      );

      this.fs.copy(
        this.templatePath('roles/fooapp/.gitkeep'),
        this.destinationPath(this.props.name + '/roles/fooapp/.gitkeep')
      );

      this.fs.copy(
        this.templatePath('roles/monitoring/.gitkeep'),
        this.destinationPath(this.props.name + '/roles/monitoring/.gitkeep')
      );

      this.fs.copy(
        this.templatePath('roles/webtier/.gitkeep'),
        this.destinationPath(this.props.name + '/roles/webtier/.gitkeep')
      );
    }

    this.fs.copy(
      this.templatePath('site.yml'),
      this.destinationPath(this.props.name + '/site.yml')
    );

    this.fs.copy(
      this.templatePath('dbservers.yml'),
      this.destinationPath(this.props.name + '/dbservers.yml')
    );

    this.fs.copy(
      this.templatePath('webservers.yml'),
      this.destinationPath(this.props.name + '/webservers.yml')
    );
  }
};
