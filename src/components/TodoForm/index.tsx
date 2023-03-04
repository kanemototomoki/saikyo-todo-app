import { schema, type Schema } from '@functions/api/[[route]]'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export type Props = {}

export default function TodoForm() {
  const { register, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid">
      <label>
        Title:
        <input type="text" {...register('title')} />
      </label>
      <label>
        Is Done:
        <input type="checkbox" {...register('isDone')} />
      </label>
      <label>
        Due Date:
        <input type="date" {...register('dueDate')} />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}
