/* eslint-disable import/no-absolute-path */
import { cn } from '@client/lib/utils'
import './index.scss'
import { ReactComponent as LogoArch } from '/public/logo_arch.svg'
import { ReactComponent as LogoText } from '/public/logo_text.svg'

export type Props = {}
export default function Logo() {
  return (
    <div className={cn('logo grid place-items-center grid-areas-[center]')}>
      <LogoArch
        className={cn(
          'h-[550px] w-[550px] animate-[spin_10s_linear_infinite] grid-in-[center]'
        )}
      />
      <LogoText className={cn('grid-in-[center]')} />
    </div>
  )
}
