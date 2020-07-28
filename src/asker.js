const inquirer = require('inquirer')
const { handleErrors, validate } = require('./util')

const createPrompt = name => ({ type: 'input', name })

const ask = (questions, report = console.log) =>
  inquirer
    .prompt(Object.keys(questions).shuffle().map(createPrompt))
    .then(answers => report(validate(answers, questions)), handleErrors)

module.exports = { ask, createPrompt, validate, handleErrors }
