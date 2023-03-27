import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Logo from '@client/components/Logo'
import TodoForm from '@client/components/TodoForm'
import TodoList from '@client/components/TodoList'
import { cn } from '@client/lib/utils'
import SplashAnimation from '../../components/SplashAnimation'

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
          'grid h-screen grid-rows-[1fr] px-4 grid-areas-[root-center]'
        )}
      >
        <div className={cn('grid-in-[root-center]')}>
          <SplashAnimation />
        </div>
        <main
          role="main"
          className={cn(
            'container-type-inline mx-auto grid w-full grid-cols-[auto_auto] justify-center gap-20 @container/App grid-in-[root-center]'
          )}
        >
          <div
            className={cn('w-[40cqw] self-center @[640px]/App:max-w-[400px] mt-[30cqh]')}
          >
            <TodoForm />
            <div className={cn('scale-[.70] grid place-content-center')}>
              <Logo />
            </div>
          </div>
          <div
            className={cn(
              'max-h-[100svh] w-[40cqw] overflow-auto @[640px]/App:max-w-[600px]'
            )}
          >
            <TodoList />
          </div>
        </main>
        {isDev && <ReactQueryDevtools initialIsOpen={false} />}
      </div>
    </QueryClientProvider>
  )
}

export default App
