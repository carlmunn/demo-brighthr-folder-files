import { describe, it, expect } from 'vitest'
import {orderNodesBy, filterNodesByName} from '@/utilities/nodes.ts'

import testData from '@test/test_data.ts'

// TODO:
// Test with folder and files (recursion)
// Test with a future date
// Test with corrupted structure
// Test with non ASCII or standard character tests
// Test with long file names or missing
// Test using 'direction' (Ignored)

describe('#orderNodesBy', async () => {
  it('gives empty array with "name" order', async () => {
    const newNodes = orderNodesBy([], 'name')
    expect(newNodes).toEqual([])
  })

  // It doesn't 'throw' because the array is empty, it doesn't get to the
  // sort function.
  it('gives empty array with "INVALID" order', async () => {
    const newNodes = orderNodesBy([], 'INVALID')
    expect(newNodes).toEqual([])
  })

  // It doesn't 'throw' because the array contains only one item, it doesn't get to the
  // sort function.
  it('gives empty array with "INVALID" order with a single item', async () => {
    const newNodes = orderNodesBy(testData.FAKE_API_SINGLE_FILE, 'INVALID')
    expect(newNodes).toEqual(testData.FAKE_API_SINGLE_FILE)
  })

  // It doesn't 'throw' because the array contains only one item, it doesn't get to the
  // sort function.
  it('gives empty array with "INVALID" order and errors', async () => {
    expect(() => {
      orderNodesBy(testData.FAKE_API_MULTI_FILES, 'INVALID')
    }).toThrowError(/Unknown orderBy option: INVALID/)
  })

  it('gives empty array with "name" order', async () => {
    const newNodes = orderNodesBy(testData.FAKE_API_MULTI_FILES_UNORDERED, 'name')
    const result = newNodes.map(i => i.name)
    expect(result[0]).toEqual('AAA First File')
    expect(result[1]).toEqual('BBB Second File')
    expect(result[2]).toEqual('ZZZ Last File')
  })

  it('gives empty array with "added" order', async () => {
    const newNodes = orderNodesBy(testData.FAKE_API_MULTI_FILES_UNORDERED, 'added')
    const result = newNodes.map(i => i.added)
    expect(result[0]).toEqual('2025-01-01')
    expect(result[1]).toEqual('2017-01-06')
    expect(result[2]).toEqual('1980-01-01')
  })

  it('gives empty array with "added" order', async () => {
    const newNodes = orderNodesBy(testData.FAKE_API_FOLDER_AND_FILES, 'added')
    const result = newNodes[1].files.map(i => i.added)

    expect(result[0]).toEqual('2025-01-01')
    expect(result[1]).toEqual('2017-01-06')
    expect(result[2]).toEqual('1980-01-01')
  })
})

// REMINDER: It does not filter out, it only sets the 'hidden' field to true/false
describe('#filterNodesByName', async () => {
  it('gives empty array with "name" as filter on empty array input', async () => {
    const newNodes = filterNodesByName([], 'name')
    expect(newNodes).toEqual([])
  })

  it('gives empty array with "" as filter on empty array input', async () => {
    const newNodes = filterNodesByName([], 'name')
    expect(newNodes).toEqual([])
  })

  it('gives empty array with "UNKNOWN_NAME" as filter', async () => {
    const newNodes = filterNodesByName(testData.FAKE_API_MULTI_FILES_UNORDERED, 'UNKNOWN_NAME')

    // This trick helps with identifying what is returned if something does
    // wrong in test failures. I can see I want AAA, and the tests below show
    // true|false for each one
    const result = newNodes.map(n => `${n.hidden}__${n.name}`)

    expect(result[0]).toEqual('true__AAA First File')
    expect(result[1]).toEqual('true__ZZZ Last File')
    expect(result[2]).toEqual('true__BBB Second File')
  })

  it('gives single item in array with "AAA" as filter', async () => {
    const newNodes = filterNodesByName(testData.FAKE_API_MULTI_FILES_UNORDERED, 'AAA')
    const result = newNodes.map(n => `${n.hidden}__${n.name}`)

    expect(result[0]).toEqual('false__AAA First File')
    expect(result[1]).toEqual('true__ZZZ Last File')
    expect(result[2]).toEqual('true__BBB Second File')
  })

  it('gives all items in array with "File" as filter since they all have it', async () => {
    const newNodes = filterNodesByName(testData.FAKE_API_MULTI_FILES_UNORDERED, 'File')
    const result = newNodes.map(n => `${n.hidden}__${n.name}`)

    expect(result[0]).toEqual('false__AAA First File')
    expect(result[1]).toEqual('false__ZZZ Last File')
    expect(result[2]).toEqual('false__BBB Second File')
  })

  it('gives all items in array with "File" as filter since they all have it', async () => {
    const newNodes = filterNodesByName(testData.FAKE_API_FOLDER_AND_FILES, 'File')
    const result = newNodes[1].files.map(n => `${n.hidden}__${n.name}`)

    expect(result[0]).toEqual('false__AAA First File')
    expect(result[1]).toEqual('false__ZZZ Last File')
    expect(result[2]).toEqual('false__BBB Second File')
  })
})