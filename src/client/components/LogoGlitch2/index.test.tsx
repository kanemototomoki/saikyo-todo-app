import { render, screen } from '@testing-library/react';
import LogoGlitch2 from '.'


describe('LogoGlitch2', () => {
  it('コンポーネントが存在すること', () => {
    render(<LogoGlitch2 />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
