#! /usr/bin/env node

'use strict'

console.log('Hello Jarvis');

var chalk = require('chalk');
var co = require('co');
var prompt = require('co-prompt');
var program = require('commander');

program
  .arguments('<file>')
  .option('-u, --username <username>', 'The user to authenticate as')
  .option('-p, --password <password>', 'The user\'s password')
  .action(function(file) {
    co(function*() {
      var username = yield prompt(chalk.bold.cyan('username: '));
      var password = yield prompt.password(chalk.bold.cyan('password: '));

      console.log(`${chalk.bold.cyan('user:')} %s ${chalk.bold.cyan('pass:')} %s ${chalk.bold.cyan('file:')} %s`, username, password, file);
    });
  })
  .version(require('../package').version)
  .parse(process.argv);
