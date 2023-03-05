import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TodoForm from '@client/components/TodoForm'
import TodoList from '@client/components/TodoList'
import { cn } from '@client/lib/utils'

const queryClient = new QueryClient()

function App() {
  const isDev = import.meta.env.DEV
  const wrapperClass = cn(
    'grid h-screen grid-rows-[1fr]',
    isDev && 'grid-rows-[auto_1fr]'
  )

  return (
    <QueryClientProvider client={queryClient}>
      <div className={wrapperClass}>
        {isDev && (
          <header
            className={cn(
              'w-full bg-red-500 py-2 text-center font-bold text-white'
            )}
          >
            preview環境です
          </header>
        )}
        <main
          role="main"
          className={cn(
            'container-type-inline mx-auto grid w-full place-content-center @container/App'
          )}
        >
          <TodoForm />
          <TodoList />
        </main>
      </div>
    </QueryClientProvider>
  )
}

export default App
