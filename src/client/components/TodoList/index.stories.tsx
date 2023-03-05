import { type Meta, type StoryObj } from '@storybook/react'
import TodoList from '.';

const meta = {
  title: "components/TodoList",
  component: TodoList,
  parameters: {},
  args: {}
} satisfies Meta<typeof TodoList>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    primary: true,
  }
}