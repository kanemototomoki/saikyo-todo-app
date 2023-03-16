import HeroAnimation from '.'
import { render, screen } from '@testing-library/react'

describe('HeroAnimation', () => {
  it('コンポーネントが存在すること', () => {
    render(<HeroAnimation />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})