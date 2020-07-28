const { describe, expect, it } = require('@jest/globals')

const { validate, flatten } = require('../util')

describe('validate', () => {
  it('returns a percentage match', () => {
    const expected = { a: 'a', b: 'b', c: 'c', d: 'd' }
    const zero = {}
    const quarter = { a: 'a' }
    const half = { a: 'a', b: 'b' }
    const threeQuarters = { a: 'a', b: 'b', c: 'c' }

    // TODO: figure out why all the tests for `incorrect` are busted

    expect(validate(expected, expected).tally).toBe(4)
    expect(validate(expected, expected).incorrect).toEqual({})

    expect(validate(zero, expected).tally).toBe(0)
    expect(validate(zero, expected).incorrect).toEqual({})

    expect(validate(quarter, expected).tally).toBe(1)
    expect(validate(quarter, expected).incorrect).toEqual({})

    expect(validate(half, expected).tally).toBe(2)
    expect(validate(half, expected).incorrect).toEqual({})

    expect(validate(threeQuarters, expected).tally).toBe(3)
    expect(validate(half, expected).incorrect).toEqual({})
  })
})

describe('flatten', () => {
  it('should flatten once-nested objects', () => {
    const nested = { key: { key2: 'value' } }
    expect(flatten(nested)).toEqual({ key2: 'value' })
  })

  it('should flatten twice-nested objects', () => {
    const nested = { key: { key2: { key3: 'value' } } }
    expect(flatten(nested)).toEqual({ key3: 'value' })
  })
})
