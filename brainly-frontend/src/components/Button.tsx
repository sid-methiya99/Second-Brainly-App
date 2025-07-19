import type { ReactElement } from 'react'

type Variant = 'primary' | 'secondary'
interface ButtonProps {
   variant: Variant
   size: 'sm' | 'md' | 'lg'
   text: string
   startIcon?: ReactElement
   endIcon?: ReactElement
   onClick?: () => void
}
const variantType: Record<Variant, string> = {
   primary: 'bg-purple-600',
   secondary: 'bg-purple-300 text-purple-600',
}
export const Button = (props: ButtonProps) => {
   return <button className={variantType[props.variant]}>Click me</button>
}
