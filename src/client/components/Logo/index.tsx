/* eslint-disable import/no-absolute-path */
import { cn } from '../../lib/utils'
import './index.css'
import { ReactComponent as LogoArch } from '/public/logo_arch.svg'
import { ReactComponent as LogoText } from '/public/logo_text.svg'

export type Props = {}
export default function Logo() {
  return (
    <div className={cn('grid grid-areas-[center] place-items-center')}>
      <LogoArch className={cn('grid-in-[center] w-[550px] h-[550px] animate-[spin_10s_linear_infinite]')} />
      <LogoText className={cn('logo-text grid-in-[center]')} />
    </div>
  )
}
