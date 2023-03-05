import { type Meta, type StoryObj } from '@storybook/react'
import TodoForm from '.'

const meta = {
  title: 'components/TodoForm',
  component: TodoForm,
  parameters: {},
  args: {}
} satisfies Meta<typeof TodoForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    primary: true
  }
}
