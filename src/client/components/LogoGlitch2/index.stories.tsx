import { type Meta, type StoryObj } from '@storybook/react';
import LogoGlitch2 from '.';


const meta = {
  title: 'components/LogoGlitch2',
  component: LogoGlitch2,
  parameters: {},
  args: {}
} satisfies Meta<typeof LogoGlitch2>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    primary: true,
  }
}
