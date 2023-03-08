import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import TodoForm from '@client/components/TodoForm'
import TodoList from '@client/components/TodoList'
import { cn } from '@client/lib/utils'

const queryClient = new QueryClient()

function App() {
  const isDev = import.meta.env.DEV
  const wrapperClass = cn(
    'grid h-screen grid-rows-[1fr] transition-all duration-300',
    isDev && 'grid-rows-[auto_1fr]'
  )

  return (
    <QueryClientProvider client={queryClient}>
      <div className={wrapperClass}>
        {isDev && (
          <>
            <header
              className={cn(
                'w-full bg-red-500 py-2 text-center font-bold text-white'
              )}
            >
              preview
            </header>
          </>
        )}
        <main
          role="main"
          className={cn(
            'container-type-inline place-content-center mx-auto grid w-full gap-6 @container/App'
          )}
        >
          <TodoForm />
          <TodoList />
        </main>
        {isDev && <ReactQueryDevtools initialIsOpen={false} />}
      </div>
    </QueryClientProvider>
  )
}

export default App
