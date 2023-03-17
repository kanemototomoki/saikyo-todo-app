import { render, screen } from '@testing-library/react'
import SplashAnimation from '.'

describe('SplashAnimation', () => {
  it('コンポーネントが存在すること', () => {
    render(<SplashAnimation />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
