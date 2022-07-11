import { HTMLAttributes } from 'react'
import { BUTTON_VARIANT_COLORS } from './styles'

declare namespace Button {
  export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
    title: string
    variant?: 'default' | 'danger'
  }

  export type ButtonVariant = keyof typeof BUTTON_VARIANT_COLORS

  export interface ButtonBaseProps {
    variant: ButtonVariant
  }
}
