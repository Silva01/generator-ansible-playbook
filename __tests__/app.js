'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-ansible-playbook:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: true});
  });

  it('creates files', () => {
    assert.file([
      'playbook/filter_plugins/.gitkeep',
      'playbook/inventories/production/group_vars/group1',
      'playbook/inventories/production/host_vars/hostname1',
      'playbook/inventories/production/hosts',
      'playbook/inventories/staging/group_vars/group1',
      'playbook/inventories/staging/host_vars/hostname1',
      'playbook/inventories/staging/hosts',
      'playbook/library/.gitkeep',
      'playbook/module_utils/.gitkeep',
      'playbook/roles/.gitkeep',
      'playbook/site.yml',
      'playbook/dbservers.yml',
      'playbook/webservers'
    ]);
  });
});
