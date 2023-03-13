import { type Meta, type StoryObj } from '@storybook/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import TodoForm from '.'

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
  args: {
  }
}
