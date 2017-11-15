'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-ansible-playbook:roles', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/roles'))
      .withPrompts({someAnswer: true});
  });

  it('creates files', () => {
    assert.file([
      'default/files/main.yml',
      'default/handlers/main.yml',
      'default/library/main.yml',
      'default/lookup_plugins/main.yml',
      'default/meta/main.yml',
      'default/module_utils/main.yml',
      'default/tasks/main.yml',
      'default/templates/main.yml',
      'default/vars/main.yml'
    ]);
  });
});
