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
        {/* <div className={cn('fixed inset-0 grid h-screen')}>
          <Logo />
        </div> */}

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
            // 親コンテナが640px以上なら350px, それ以外は親コンテナの40%
            className={cn('w-[40cqw] self-center @[640px]/App:max-w-[350px]')}
          >
            <TodoForm />
          </div>
          <div
            className={cn(
              'max-h-[100svh] w-[40cqw] overflow-auto @[640px]/App:max-w-[600px]'
            )}
          >
            <TodoList />
          </div>
          <div className={cn('absolute top-0 left-0 scale-50')}>
            <Logo />
          </div>
        </main>
        {isDev && <ReactQueryDevtools initialIsOpen={false} />}
      </div>
    </QueryClientProvider>
  )
}

export default App
