import { type Meta, type StoryObj } from '@storybook/react'
import Logo from '.'

const meta = {
  title: 'components/Logo',
  component: Logo,
  parameters: {},
  args: {},
  decorators: [
    (Story) => (
      <div style={{ paddingTop: '10px', overflow: 'hidden' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    primary: true
  }
}
