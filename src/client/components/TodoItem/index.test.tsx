import { render, screen } from '@testing-library/react'
import TodoItem, { type Props } from '.'

describe('TodoItem', () => {
  const mockProps: Props = {
    todo: {
      id: '1',
      title: 'test',
      created_at: '1234',
      is_done: '1'
    }
  }
  it('コンポーネントが存在すること', () => {
    render(<TodoItem {...mockProps} />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
