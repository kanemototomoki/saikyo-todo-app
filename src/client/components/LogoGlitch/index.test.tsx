import { render, screen } from '@testing-library/react';
import Aaaa from '.';


describe('LogoGlitch', () => {
  it('コンポーネントが存在すること', () => {
    render(<Aaaa />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
