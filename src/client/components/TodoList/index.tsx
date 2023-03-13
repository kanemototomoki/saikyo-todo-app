import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { TodoResponseSchema } from '@server/model'
import TodoItem from '@client/components/TodoItem'
import { cn } from '../../lib/utils'
import { useGetAllTodo } from './useGetAllTodo'

export type Props = {}
export default function TodoList() {
  const [isInitFinish, setIsInitFinish] = useState(false)
  const { data } = useGetAllTodo()
  const allTodo = useMemo(() => data?.todos || [], [data?.todos])
  const [displayTodo, setDisplayTodo] =
    useState<Array<TodoResponseSchema & { orderId?: number }>>(allTodo)

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
      const todoIdList = displayTodo.map((todo) => todo.id)
      const topIndex = todoIdList.at(1) as string
      const bottomIndex = todoIdList.at(-2) as string

      // 上と下の要素を監視する
      const topTarget = document.querySelector(`li[data-index="${topIndex}"]`)
      const bottomTarget = document.querySelector(
        `li[data-index="${bottomIndex}"]`
      )
      console.log(topTarget, bottomTarget)
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
  }, [])

  /**
   * 初期描画の処理
   */
  useEffect(() => {
    const addOrderIdTodo = [...allTodo].map((todo, i) => ({
      ...todo,
      orderId: i + 1
    }))
    const firstTodoId = addOrderIdTodo[0]?.orderId
    const cutTodo = addOrderIdTodo.splice(40, 10)
    setDisplayTodo(() => {
      return [...cutTodo, ...addOrderIdTodo]
    })

    // 一番若いIDの要素を画面中央にスクロールさせる
    setTimeout(() => {
      const ele = document.querySelector(`li[data-index="${firstTodoId}"]`)
      if (ele) {
        ele.style.backgroundColor = 'blue'
        ele.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      setIsInitFinish(true)
    }, 0)
  }, [allTodo])

  useEffect(() => {
    if (!isInitFinish) return

    const observer = setObserver()

    observer.observe()

    return () => {
      observer.disconnect()
    }
  }, [isInitFinish, setObserver])

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
            className={cn(
              'grid h-[calc(100vh/10)] grid-cols-[1fr_3fr_1fr_1fr] place-content-center justify-between py-4'
            )}
          >
            <TodoItem todo={todo} orderId={todo.orderId} />
          </li>
        ))}
      </ol>
    </>
  )
}
