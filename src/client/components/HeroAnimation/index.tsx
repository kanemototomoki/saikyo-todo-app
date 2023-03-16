import { cn } from '@client/lib/utils'
import './index.css'

export type Props = {}
export default function HeroAnimation() {
  return (
    <>
      <div
        className={cn('first-box z-10 h-1 w-1 bg-black grid-in-[center]')}
      ></div>
      <div
        className={cn(
          'background grid h-screen w-screen place-items-center border bg-white grid-areas-[center]'
        )}
      ></div>
    </>
  )
}
