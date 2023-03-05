import TodoForm from '.'
import { render, screen } from '@testing-library/react'

describe('TodoForm', () => {
  it('コンポーネントが存在すること', () => {
    render(<TodoForm />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})