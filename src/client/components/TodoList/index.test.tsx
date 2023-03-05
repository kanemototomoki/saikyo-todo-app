import TodoList from '.'
import { render, screen } from '@testing-library/react'

describe('TodoList', () => {
  it('コンポーネントが存在すること', () => {
    render(<TodoList />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})