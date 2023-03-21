import { type Meta, type StoryObj } from '@storybook/react';
import LogoGlitch from '.';


const meta = {
  title: 'components/LogoGlitch',
  component: LogoGlitch,
  parameters: {},
  args: {}
} satisfies Meta<typeof LogoGlitch>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    primary: true,
  }
}
