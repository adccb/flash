const handleErrors = console.error
const not = expr => !expr

const validate = (userAnswers, answers) =>
  Object.keys(userAnswers).reduce(
    (running, question) =>
      userAnswers[question] === answers[question]
        ? {
            tally: running.tally + 1,
            incorrect: running.incorrect
          }
        : {
            tally: running.tally,
            incorrect: {
              ...running.incorrect,
              [question]: userAnswers[question] || null
            }
          },
    { tally: 0, incorrect: {} }
  )

const isObject = obj => obj === Object(obj)

const flatten = collection =>
  Object.keys(collection).reduce(
    (flat, item) =>
      isObject(collection[item])
        ? { ...flat, ...flatten(collection[item]) }
        : { ...flat, [item]: collection[item] },
    {}
  )

module.exports = { validate, handleErrors, not, isObject, flatten }

// here there be ~dragons~ monkeys
// stolen from stackoverflow
Array.prototype.shuffle = function () {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[this[i], this[j]] = [this[j], this[i]]
  }

  return this
}
