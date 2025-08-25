import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import testData from '@test/test_data.ts'

import NodeList from '@/components/NodeList'

describe('NodeList', () => {
  it('renders NodeList with no "nodes" props set', async () => {
    render(<NodeList />)
    // Not setting the 'name' prop returns Unknown
    expect(screen.getByText(/Unknown Node/i)).toBeInTheDocument()
  })

  // TODO: Check for file name. file ext, date added
  it('renders NodeList with "nodes" set', async () => {
    render(<NodeList name='SUMMARY_TITE' nodes={testData.FAKE_API_FOLDER_AND_FILES}/>)
    expect(screen.getByText(/SUMMARY_TITE/)).toBeInTheDocument()

    expect(screen.getByText(/AAA First File/)).toBeInTheDocument()
    expect(screen.getByText(/BBB Second File/)).toBeInTheDocument()
    expect(screen.getByText(/ZZZ Last File/)).toBeInTheDocument()
  })
})