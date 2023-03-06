import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { postTodoSchema, type PostTodoSchema } from '@server/model'
import { postTodo } from '@client/api/Todo'
import { cn } from '@client/lib/utils'

export type Props = {}

export default function TodoForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<PostTodoSchema>({
    resolver: zodResolver(postTodoSchema)
  })

  const onSubmit = async (data: PostTodoSchema) => {
    const res = await postTodo({
      title: data.title
    })
    if (!res.ok) {
      // TODO
    }
    reset()
  }

  return (
    <form
      role="form"
      onSubmit={handleSubmit(onSubmit)}
      // 親コンテナが640px以上なら600px, それ以外は親コンテナの90%
      className={cn(
        'grid w-[90cqw] grid-cols-5 gap-4 gap-y-2 transition-all duration-300 @[640px]/App:w-[600px]'
      )}
    >
      <input
        type="text"
        placeholder="Task"
        {...register('title')}
        className={cn(
          'col-span-4 w-full rounded-md border border-gray-300 py-2 px-3'
        )}
      />
      <button
        type="submit"
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >
        追加
      </button>
      <p className={cn('col-span-2 h-[2cqh] text-sm text-red-500')}>
        {errors.title?.message || ' '}
      </p>
    </form>
  )
}
