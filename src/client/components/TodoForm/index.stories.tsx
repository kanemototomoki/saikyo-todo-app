import { expect } from '@storybook/jest'
import { type Meta, type StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { waitFor } from '@testing-library/react'
import { createMock, getMock } from 'storybook-addon-module-mock'
import TodoForm from '.'
import { useAddTodo } from './useAddTodo'

const queryClient = new QueryClient()
const meta = {
  title: 'components/TodoForm',
  component: () => (
    <QueryClientProvider client={queryClient}>
      <TodoForm />
    </QueryClientProvider>
  ),
  parameters: {},
  args: {}
} satisfies Meta<typeof TodoForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}

export const Submit: Story = {
  args: {},
  parameters: {
    moduleMock: {
      mock: () => {
        const mock = createMock<typeof useAddTodo>(useAddTodo)
        return mock
      }
    }
  },
  play: async ({ canvasElement, parameters }) => {
    const canvas = within(canvasElement)
    await waitFor(() => {
      userEvent.click(canvas.getByRole('button', { name: '追加' }))
    })
    await waitFor(() => {
      expect(canvas.getByPlaceholderText('Task')).toBeInTheDocument()
    })
  }
}
