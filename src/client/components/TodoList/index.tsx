import {
  startTransition,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import type { TodoResponseSchema } from '@server/model'
import TodoItem from '@client/components/TodoItem'
import { cn } from '../../lib/utils'
import { useGetAllTodo } from './useGetAllTodo'

export type Props = {}
export default function TodoList() {
  const [isInitFinish, setIsInitFinish] = useState(false)
  // const [displayTodo, setDisplayTodo] = useState<TodoResponseSchema[]>([])
  const {
    data,
    // error,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    removeData
  } = useGetAllTodo()
  // useEffect(() => {
  //   setDisplayTodo(() => data?.pages.flatMap((page) => page.todos) || [])
  // }, [data])
  const displayTodo: TodoResponseSchema[] = useMemo(() => {
    return data?.pages.flatMap((page) => page.todos) || []
  }, [data?.pages])
  // const displayTodo: TodoResponseSchema[] =
  //   data?.pages.flatMap((page) => page.todos) || []

  const todoIdList = displayTodo.map((todo) => todo.id)
  const topIndex = todoIdList.at(1) as string
  const bottomIndex = todoIdList.at(-2) as string

  // 上と下の要素を監視する
  const topTarget = document.querySelector(`li[data-index="${topIndex}"]`)
  const bottomTarget = document.querySelector(`li[data-index="${bottomIndex}"]`)

  const fetchNextOrPrev = ({ type }: { type: 'next' | 'prev' }) => {
    console.log('fetchNextOrPrev', type, displayTodo.length)
    if (displayTodo.length === 30) return

    const fn = type === 'next' ? fetchNextPage : fetchPreviousPage
    fn()
    // Todoが30以上あれば削除する
    // void fn().then((res) => {
    //   const len = res.data?.pages?.length || 1
    //   console.log(len, displayTodo, isFetching)
    //   if (len > 3 && !isFetching) {
    //     const page = type === 'next' ? 1 : len - 1
    //     const re = removeData(page)
    //     console.log('削除！！', re)
    //   }
    // })
  }

  const observerRef = useRef(
    new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            console.log('observe', {
              'data-index': entry.target.dataset.index,
              // isIntersecting: entry.isIntersecting,
              displayTodoLength: displayTodo.length
            })
            entry.target.style.backgroundColor = 'pink'

            if (entry.target.dataset.index === topIndex) {
              fetchNextOrPrev({ type: 'prev' })
            } else {
              fetchNextOrPrev({ type: 'next' })
            }
          }
        }
      },
      {
        root: null,
        rootMargin: '20% 0px',
        threshold: 0
      }
    )
  )

  const setObserver = useCallback(() => {
    const observer = observerRef.current

    function observe() {
      if (!topTarget || !bottomTarget) return

      observer.observe(topTarget)
      observer.observe(bottomTarget)
    }
    function disconnect() {
      observer.disconnect()
    }

    return {
      observe,
      disconnect
    }
  }, [bottomTarget, topTarget])

  /**
   * ページ読み込み時の初期設定
   */
  useEffect(() => {
    // 1ページ目しか存在しないときに実行
    if (!data || data.pages[1]) return
    const fn = async () => {
      const { prev, next, todos } = data.pages[0]
      const firstTodoId = todos[0].id
      await fetchPreviousPage({ pageParam: prev })
      await fetchNextPage({ pageParam: next })

      const ele = document.querySelector(`li[data-index="${firstTodoId}"]`)
      if (ele) {
        ele.style.backgroundColor = 'blue'
        ele.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      await Promise.resolve()
    }

    const observer = setObserver()

    fn()
      .then(() => {
        setIsInitFinish(true)

        observer.observe()
        observer.observe()
      })
      .catch((e) => {
        console.error(e)
      })

    return () => {
      observer.disconnect()
    }
  }, [data])

  useEffect(() => {
    if (!isInitFinish) return

    const observer = setObserver()

    observer.observe()
    observer.observe()

    return () => {
      observer.disconnect()
    }
  }, [isInitFinish, setObserver])

  return (
    <>
      <ul
        id="todoList"
        className="-pt-[calc(100vh/24)] divide-y divide-gray-200"
      >
        {displayTodo.map((todo) => (
          <li
            key={todo.id}
            data-index={todo.id}
            className={cn(
              'grid h-[calc(100vh/10)] grid-cols-[3fr_1fr_1fr] place-content-center items-center justify-between py-4'
            )}
          >
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          display: 'grid'
        }}
      >
        <button
          style={{
            border: '1px solid'
          }}
          onClick={() => removeData(1)}
        >
          最初を削除
        </button>
        <button
          style={{
            border: '1px solid'
          }}
          onClick={() => removeData(data?.pages.length - 1)}
        >
          最後を削除
        </button>
      </div>
    </>
  )
}
