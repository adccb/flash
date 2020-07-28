const { describe, expect, it } = require('@jest/globals')

const { createPrompt } = require('../asker')

describe('createPrompt', () => {
  it('correctly creates prompt hashes', () => {
    const q = 'froggy went a-courtin. what was by his side?'
    expect(createPrompt(q)).toEqual({ type: 'input', name: q })
  })
})
