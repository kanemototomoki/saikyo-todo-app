import { cn } from '@src/lib/utils'
import TodoForm from '@src/components/TodoForm'

function App() {
  return (
    <main
      role="main"
      className={cn(
        'App container-type-inline mx-auto grid h-screen place-content-center @container/App'
      )}
    >
      <TodoForm />
    </main>
  )
}

export default App
