import { type Meta, type StoryObj } from '@storybook/react';
import LogoGlitch1 from '.';


const meta = {
  title: 'components/LogoGlitch1',
  component: LogoGlitch1,
  parameters: {},
  args: {}
} satisfies Meta<typeof LogoGlitch1>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    primary: true,
  }
}
