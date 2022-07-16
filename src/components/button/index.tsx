import { HTMLAttributes } from 'react'
import { BaseButton } from './styles'

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  title: string
  variant?: 'default' | 'danger'
}

export function Button({
  variant = 'default',
  title,
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      role="button"
			id={`test-button-${title.toLowerCase()}`}
      variant={variant}
      {...props}
    >
      {children}
      {title}
    </BaseButton>
  )
}
