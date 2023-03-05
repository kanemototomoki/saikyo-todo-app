import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';
import { todoSchema } from '@server/model';
import { cn } from '@client/lib/utils';


export type Props = {}
export const userInputSchema = todoSchema.pick({
  title: true
})

export type UserInputSchema = z.infer<typeof userInputSchema>

export default function TodoForm() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<UserInputSchema>({
    resolver: zodResolver(userInputSchema)
  })

  const onSubmit = (data: UserInputSchema) => {
    console.warn(data)
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
        className="w-max rounded bg-blue-500 py-2 px-4 font-bold text-white  hover:bg-blue-700"
      >
        追加
      </button>
      {errors.title?.message && (
        <p className="col-span-2 text-sm text-red-500">
          {errors.title?.message}
        </p>
      )}
    </form>
  )
}
