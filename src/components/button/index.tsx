import { BaseButton } from './styles'

export function Button({
  variant = 'default',
  title,
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseButton variant={variant} {...props}>
      {children}
      {title}
    </BaseButton>
  )
}
