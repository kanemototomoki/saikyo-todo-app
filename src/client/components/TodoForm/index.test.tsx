import { composeStories } from '@storybook/react';
import { render, screen, renderHook, waitFor } from '@testing-library/react';
import { createQueryWrapper } from '@client/lib/testWrapper';
import TodoForm from '.';
import * as Stories from './index.stories';
import { useAddTodo } from './useAddTodo';


const { Submit } = composeStories(Stories)

describe('TodoForm', () => {
  it('submit', () => {
    const { queryAllByRole } = render(<Submit />)

    const { queryWrapper } = createQueryWrapper()
    render(<TodoForm />, { wrapper: queryWrapper })
    renderHook(() => useAddTodo, { wrapper: queryWrapper })
    console.log(queryAllByRole('alert').length)
    expect(queryAllByRole('alert').length).toBeInTheDocument()
  })
})
