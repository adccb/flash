const homeDir = require('os').homedir()
const { asker, not, flatten, isObject } = require('./src')

let config
try {
  config = require(`${homeDir}/.config/flash/flash.json`)
} catch (e) {
  if (e.code === 'MODULE_NOT_FOUND') {
    console.log('you need a config file! to get started, run:')
    console.log('  $ mkdir -p ~/.config/flash')
    console.log('  $ echo {}> ~/.config/flash/flash.json')
    process.exit()
  }
}

const [topic, ...args] = process.argv.slice(2)

if (not(topic))
  console.log('please specify a topic matching a key in your flash.json.'),
    process.exit()

let quizMaterial
if (topic.includes('.')) {
  let path = topic.split('.')
  quizMaterial = config[path[0]]
  path = path.slice(1)

  while (path.length > 0) {
    quizMaterial = quizMaterial[path[0]]
    path = path.slice(1)
  }
} else if (isObject(config[topic])) {
  quizMaterial = flatten(config[topic])
}

asker.ask(quizMaterial, ({ tally, incorrect }) => {
  const total = Object.keys(quizMaterial).length

  console.log(`\nyou answered ${tally} of ${total} questions correctly!\n`)
  Object.keys(incorrect).forEach(question =>
    console.log(
      `for question ${question}, you answered ${incorrect[question]}. the correct answer was ${quizMaterial[question]}.`
    )
  )
})
