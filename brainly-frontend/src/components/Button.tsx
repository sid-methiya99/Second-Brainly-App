import type { ReactElement } from 'react'

type Variant = 'primary' | 'secondary'
interface ButtonProps {
   variant: Variant
   text: string
   startIcon?: ReactElement
   onClick?: () => void
}
const variantType: Record<Variant, string> = {
   primary:
      'bg-purple-600 text-white font-normal text-lg px-4 py-2 rounded text-center mt-10 rounded-sm flex items-center',
   secondary:
      'bg-purple-200 text-purple-600 font-normal text-lg px-4 py-2 rounded text-center mt-10 rounded-sm flex items-center',
}
export const Button = ({ variant, text, startIcon }: ButtonProps) => {
   return (
      <button className={variantType[variant]}>
         <div className="pr-2">{startIcon}</div>
         <span>{text}</span>
      </button>
   )
}
