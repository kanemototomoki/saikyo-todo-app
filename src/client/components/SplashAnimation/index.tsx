import { cn } from '@client/lib/utils'
import './index.css'
// eslint-disable-next-line import/no-absolute-path
import { ReactComponent as SplashText } from '/public/splash_text.svg'

export type Props = {}
export default function SplashAnimation() {
  return (
    <>
      <div
        className={cn(
          'splash-animation background sticky z-[100] grid h-screen w-full place-items-center bg-white grid-areas-[center]'
        )}
      >
        <div
          className={cn(
            'ele first-box z-10 h-[1vw] w-[1vw] bg-black grid-in-[center]'
          )}
        />
        <div
          className={cn(
            'ele second-box z-10 h-[1vw] w-[1vw] bg-white grid-in-[center]'
          )}
        />
        <div
          className={cn(
            'ele third-box z-10 h-[1vw] w-[1vw] bg-black grid-in-[center]'
          )}
        />
        <SplashText className={cn('splash-text z-20 w-[20vw] h-[20vh] grid-in-[center]')} />
      </div>
    </>
  )
}