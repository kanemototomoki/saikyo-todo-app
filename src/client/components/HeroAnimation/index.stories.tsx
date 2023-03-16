import { type Meta, type StoryObj } from '@storybook/react'
import HeroAnimation from '.';

const meta = {
  title: "components/HeroAnimation",
  component: HeroAnimation,
  parameters: {},
  args: {}
} satisfies Meta<typeof HeroAnimation>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    primary: true,
  }
}