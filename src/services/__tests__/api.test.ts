import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import {apiGet} from '@/services/api.ts'

describe('API', async () => {
  it('Make call to get data', async () => {
    const jsonData = await apiGet()
    console.info('DEBUG:', jsonData)
  })
})