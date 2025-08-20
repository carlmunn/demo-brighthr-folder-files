import { render, screen, waitFor } from '@testing-library/react'
import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import NodeList from '@/components/NodeList'

describe('NodeList', () => {
  it('renders NodeList', async () => {
    render(<NodeList />)
    expect(screen.getByText(/ITEM0/i)).toBeInTheDocument()
  })
})