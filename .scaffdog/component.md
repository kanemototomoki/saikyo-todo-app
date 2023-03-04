---
name: 'component'
description: 'Generate React Component'
root: './src/components'
output: '**/*'
ignore: []
questions:
  name: 'Please enter component name'
---

# `{{ inputs.name | pascal }}/index.tsx`
```tsx
export type Props = {}
export default function {{ inputs.name | pascal }}() {
  return (
    <>
      <h1>{{ inputs.name | pascal }}</h1>
    </>
  )
}
```

# `{{ inputs.name | pascal }}/index.stories.tsx`
```tsx
import { type Meta, type StoryObj } from '@storybook/react'
import {{ inputs.name | pascal }} from '.';

const meta = {
  title: "components/{{ inputs.name | pascal }}",
  component: {{ inputs.name | pascal }},
  parameters: {},
  args: {}
} satisfies Meta<typeof {{ inputs.name | pascal }}>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    primary: true,
  }
}
```

# `{{ inputs.name | pascal }}/index.test.tsx`
```tsx
import {{ inputs.name | pascal }} from '.'
import { render, screen } from '@testing-library/react'

describe('{{ inputs.name | pascal }}', () => {
  it('コンポーネントが存在すること', () => {
    render(<{{ inputs.name | pascal }} />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
```
