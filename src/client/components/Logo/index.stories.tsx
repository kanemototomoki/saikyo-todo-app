import { type Meta, type StoryObj } from '@storybook/react'
import Logo from '.';

const meta = {
  title: "components/Logo",
  component: Logo,
  parameters: {},
  args: {}
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    primary: true,
  }
}