export const greet = () => {
  return 'hello'
}

export default function SampleComponent() {
  const text = greet()
  return (
    <div className="foo">
      <h1>{text}</h1>
    </div>
  )
}
