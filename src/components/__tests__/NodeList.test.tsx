import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import NodeList from '@/components/NodeList'

// TODO: Tests: Changing order. Showing/Hiding nodes

describe('NodeList', () => {
  it('renders NodeList', async () => {
    render(<NodeList />)
    expect(screen.getByText(/Unknown Node/i)).toBeInTheDocument()
  })

  // TODO: Check for file name. file ext, date added
})