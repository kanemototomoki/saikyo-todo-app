import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Logo from '@client/components/Logo'
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
      <div className={cn('grid h-screen grid-rows-[1fr] px-4')}>
        <main
          role="main"
          className={cn(
            'container-type-inline mx-auto grid w-full grid-cols-[auto_auto] place-content-center gap-6 @container/App'
          )}
        >
          <div className={cn('self-center')}>
            <TodoForm />
          </div>
          <div className={cn('max-h-[100svh] overflow-auto')}>
            <TodoList />
          </div>
          <div className={cn('absolute bottom-0 left-0 scale-50')}>
            <Logo />
          </div>
        </main>
        {isDev && <ReactQueryDevtools initialIsOpen={false} />}
      </div>
    </QueryClientProvider>
  )
}

export default App
