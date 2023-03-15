import Logo from '.'
import { render, screen } from '@testing-library/react'

describe('Logo', () => {
  it('コンポーネントが存在すること', () => {
    render(<Logo />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})