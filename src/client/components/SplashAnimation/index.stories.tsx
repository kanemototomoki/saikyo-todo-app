import { type Meta, type StoryObj } from '@storybook/react'
import SplashAnimation from '.'

const meta = {
  title: 'components/SplashAnimation',
  component: SplashAnimation,
  parameters: {},
  decorators: [
    (Story) => (
      <div style={{ overflow: 'hidden' }}>
        <Story />
      </div>
    )
  ],
  args: {}
} satisfies Meta<typeof SplashAnimation>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    primary: true
  }
}
