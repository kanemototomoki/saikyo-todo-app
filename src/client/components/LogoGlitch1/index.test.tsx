import { render, screen } from '@testing-library/react';
import LogoGlitch1 from '.'


describe('LogoGlitch1', () => {
  it('コンポーネントが存在すること', () => {
    render(<LogoGlitch1 />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
