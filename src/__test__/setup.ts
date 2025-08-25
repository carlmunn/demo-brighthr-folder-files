import '@testing-library/jest-dom'
import { expect, afterEach, beforeAll, afterAll } from 'vitest'
import { server } from '@/__test__/mocks/node'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

beforeAll(() => server.listen())
afterAll(() => server.close())

afterEach(() => {
  server.resetHandlers()
  cleanup()
})