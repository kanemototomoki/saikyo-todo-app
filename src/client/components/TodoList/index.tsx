import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { TodoResponseSchema } from '@server/model'
import TodoItem from '@client/components/TodoItem'
import { cn } from '../../lib/utils'
import { useGetAllTodo } from './useGetAllTodo'

export type Props = {}
export default function TodoList() {
  const { data } = useGetAllTodo()
  const allTodo = useMemo(() => data?.todos || [], [data?.todos])
  const [displayTodo, setDisplayTodo] =
    useState<Array<TodoResponseSchema & { orderId?: number }>>(allTodo)
  const observeTargetBottom = useRef<{
    index: number | string
    isShow: boolean
  }>({
    index: 0,
    isShow: false
  })

  const createObserver = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && displayTodo.length !== 0) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              entry.target.style.backgroundColor = 'pink'

              if (
                (entry.target as HTMLElement).dataset.index ===
                observeTargetBottom.current.index
              ) {
                // topの要素を削ってbottomに追加する
                const count = Math.min(10, Math.floor(displayTodo.length / 5))
                const start = 0
                const copyTodo = [...displayTodo]
                const cutTodo = copyTodo.splice(start, count)
                setDisplayTodo(() => {
                  return [...copyTodo, ...cutTodo]
                })

                console.log(observeTargetBottom.current)

                // debugger
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
      if (displayTodo.length <= 15) {
        return
      }
      // 下から二番目くらいの要素を監視する
      const point = displayTodo.length >= 15 ? -2 : -1
      const ele = document.querySelector(
        `li[data-index="${displayTodo.at(point)?.orderId || ''}"`
      )
      if (ele) {
        observer.observe(ele)

        observeTargetBottom.current = {
          index: (ele as HTMLLIElement).dataset.index!,
          isShow: false
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

  /**
   * 初期描画の処理
   */
  useEffect(() => {
    const addOrderIdTodo = [...allTodo].map((todo, i) => ({
      ...todo,
      orderId: i + 1
    }))

    if (addOrderIdTodo.length <= 15) {
      setDisplayTodo(() => addOrderIdTodo)
      return
    }

    const firstTodoId = addOrderIdTodo[0]?.orderId
    const len = addOrderIdTodo.length
    const count = Math.min(10, Math.floor(len / 5))
    const start = len - count
    const cutTodo = addOrderIdTodo.splice(start, count)
    setDisplayTodo(() => {
      return [...cutTodo, ...addOrderIdTodo]
    })

    // 一番若いIDの要素を画面中央にスクロールさせる
    setTimeout(() => {
      const ele = document.querySelector(`li[data-index="${firstTodoId}"]`)
      if (ele) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ele.style.backgroundColor = 'blue'
        ele.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 0)
  }, [allTodo])

  useEffect(() => {
    const observer = setObserver()
    observer.observe()

    return () => {
      observer.disconnect()
    }
  }, [setObserver])

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
