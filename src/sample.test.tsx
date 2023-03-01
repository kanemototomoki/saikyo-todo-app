import SampleComponent, { greet } from '@src/sample'
import { render, screen } from '@testing-library/react'

describe('Sample', () => {
  it('コンポーネントが存在すること', () => {
    render(<SampleComponent />)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('greet', () => {
    const result = greet();
    expect(result).toEqual('hello')
  })
})
