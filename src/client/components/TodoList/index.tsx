import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { TodoResponseSchema } from '@server/model'
import TodoItem from '@client/components/TodoItem'
import { cn } from '../../lib/utils'
import { useGetAllTodo } from './useGetAllTodo'

// 画面内に表示するTODOの数
const DISPLAY_TODO_COUNT = 7
// 無限スクロールをONにする閾値
const INFINITY_SCROLL_THRESHOLD = DISPLAY_TODO_COUNT + 3
export type Props = {}
export default function TodoList() {
  const { data } = useGetAllTodo()
  const allTodo = useMemo(() => data?.todos || [], [data?.todos])
  const [displayTodo, setDisplayTodo] =
    useState<Array<TodoResponseSchema & { orderId?: number }>>(allTodo)
  const observeTargetBottom = useRef<{
    index: number | string
  }>({
    index: 0
  })

  const createObserver = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && displayTodo.length !== 0) {
              if (
                (entry.target as HTMLElement).dataset.index ===
                observeTargetBottom.current.index
              ) {
                // topの要素を削ってbottomに追加する
                const count = Math.min(
                  DISPLAY_TODO_COUNT,
                  Math.floor(displayTodo.length / 5)
                )
                const start = 0
                const copyTodo = [...displayTodo]
                const cutTodo = copyTodo.splice(start, count)
                setDisplayTodo(() => {
                  return [...copyTodo, ...cutTodo]
                })
              }
            }
          }
        },
        {
          root: document.querySelector('ul[id="todoList"]'),
          rootMargin: '50%',
          threshold: 0.0
        }
      ),
    [displayTodo]
  )

  const setObserver = useCallback(() => {
    const observer = createObserver

    function observe() {
      if (displayTodo.length <= INFINITY_SCROLL_THRESHOLD) {
        return
      }
      // 下から二番目くらいの要素を監視する
      const point = displayTodo.length >= INFINITY_SCROLL_THRESHOLD ? -2 : -1
      const ele = document.querySelector(
        `li[data-index="${displayTodo.at(point)?.orderId || ''}"`
      )
      if (ele) {
        observer.observe(ele)

        observeTargetBottom.current = {
          index: (ele as HTMLLIElement).dataset.index!
        }
      }
    }
    function disconnect() {
      observer.disconnect()
    }

    return {
      observe,
      disconnect
    }
  }, [createObserver, displayTodo])

  useEffect(() => {
    const addOrderIdTodo = [...allTodo].map((todo, i) => ({
      ...todo,
      orderId: i + 1
    }))

    setDisplayTodo(() => addOrderIdTodo)
  }, [allTodo])

  useEffect(() => {
    const observer = setObserver()
    observer.observe()

    return () => {
      observer.disconnect()
    }
  }, [setObserver])

  const liClassName = cn(
    'grid grid-cols-[1fr_3fr_1fr_1fr] place-content-center justify-between py-4',
    DISPLAY_TODO_COUNT
      ? `h-[calc(100vh/${DISPLAY_TODO_COUNT})]`
      : 'h-[calc(100vh/10)]'
  )

  return (
    <>
      <ol
        id="todoList"
        className="fjalla-one list-outside list-decimal divide-y divide-gray-200"
      >
        {displayTodo.map((todo) => (
          <li
            key={todo.id}
            data-index={todo.orderId}
            className={liClassName}
          >
            <TodoItem todo={todo} orderId={todo.orderId} />
          </li>
        ))}
      </ol>
    </>
  )
}
