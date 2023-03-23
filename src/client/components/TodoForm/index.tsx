import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { postTodoSchema, type PostTodoSchema } from '@server/model'
import { cn } from '@client/lib/utils'
import { useAddTodo } from './useAddTodo'

export type Props = {}

export default function TodoForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset: formReset
  } = useForm<PostTodoSchema>({
    resolver: zodResolver(postTodoSchema)
  })
  const {
    mutate,
    isSuccess,
    isError,
    isLoading,
    reset: mutateReset
  } = useAddTodo()

  const onSubmit = (data: PostTodoSchema) => {
    mutate({
      title: data.title
    })
    formReset()
  }

  useEffect(() => {
    if (isError || isSuccess) {
      setTimeout(() => {
        mutateReset()
      }, 3000)
    }
  }, [isError, isSuccess, mutateReset])

  return (
    <form
      role="form"
      onSubmit={handleSubmit(onSubmit)}
      className={cn('grid place-items-center gap-y-4')}
    >
      <div className={cn('relative col-span-5 w-full')}>
        <input
          type="text"
          id="on-error-email"
          className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm ring-2 invalid:ring-red-500 focus:border-transparent focus:outline-none focus:ring-2"
          placeholder="Task"
          {...register('title')}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          fill="currentColor"
          className={cn(
            'absolute right-2 bottom-3 hidden text-red-500',
            // TODO
            isError ? 'block' : ''
          )}
          viewBox="0 0 1792 1792"
        >
          <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z"></path>
        </svg>
        <p
          className="absolute -bottom-6 text-sm text-red-500"
          role="alert"
          aria-label={errors.title?.message || ''}
        >
          {errors.title?.message}
        </p>
      </div>
      <button
        type="submit"
        className="col-start-3 w-max rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
        disabled={isLoading}
      >
        追加
      </button>
    </form>
  )
}
