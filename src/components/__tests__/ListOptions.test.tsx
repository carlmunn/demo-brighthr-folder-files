import { describe, it, expect, vi} from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import ListOptions from '@/components/ListOptions'

// NOTE: 'onChange' gets called twice. Once for #render and one for the actual
//       input value change.
//
describe('ListOptions', async () => {
  it('expects onChagne function to be called twice', () => {
    const mockOnChange = vi.fn()

    render(<ListOptions onChange={mockOnChange} />)
    const inputElement = screen.getByPlaceholderText('Filter file names')
    fireEvent.change(inputElement, {target: {value: 'Lorem'}})

    expect(mockOnChange).toHaveBeenCalledTimes(2)
  })

  it('expects the filters to be present', ()=>{
    render(<ListOptions onChange={vi.fn()} />)

    expect(screen.getAllByText('Order Files By').length).toEqual(1)
    expect(screen.getAllByText('Name (a→z)').length).toEqual(1)
  })
})