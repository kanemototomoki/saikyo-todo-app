import { type Meta, type StoryObj } from '@storybook/react'
import TodoItem from '.'

const meta = {
  title: 'components/TodoItem',
  component: TodoItem,
  parameters: {},
  args: {}
} satisfies Meta<typeof TodoItem>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    todo: {
      id: '1',
      title: 'test',
      created_at: '1234',
      is_done: '1'
    }
  }
}
