import { describe, it, expect } from 'vitest'

import {apiGet} from '@/services/api.ts'

// API is using a single JSON file serviced from /public for this demo
//
describe('API', async () => {
  it('Check the fake data is present', async () => {
    const data = await apiGet()

    expect(data[0].name).toEqual('Employee Handbook')
    expect(data.length).toEqual(5)
  })

  // it('Check the node structure for file', async () => {
  // })

  // it('Check the node structure for folder', async () => {
  // })
})