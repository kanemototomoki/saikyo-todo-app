import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import TodoForm from '@client/components/TodoForm'
import TodoList from '@client/components/TodoList'
import { cn } from '@client/lib/utils'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false
    }
  }
})

function App() {
  const isDev = import.meta.env.DEV

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={cn(
          'grid h-screen grid-rows-[1fr] px-4 transition-all duration-300'
        )}
      >
        <main
          role="main"
          className={cn(
            'container-type-inline mx-auto grid w-full grid-cols-[auto_auto] place-content-center items-center justify-items-center gap-6 @container/App'
          )}
        >
          <div className={cn('')}>
            <TodoForm />
          </div>
          <div className={cn(' max-h-[100svh] overflow-auto')}>
            <TodoList />
          </div>
        </main>
        {isDev && <ReactQueryDevtools initialIsOpen={false} />}
      </div>
    </QueryClientProvider>
  )
}

export default App
