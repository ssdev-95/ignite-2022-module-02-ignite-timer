import styled from 'styled-components'

export const BUTTON_VARIANT_COLORS = {
  default: 'green-300',
  danger: 'red-500',
} as const

type ButtonVariant = keyof typeof BUTTON_VARIANT_COLORS

interface ButtonBaseProps {
  variant: ButtonVariant
}

export const BaseButton = styled.button<ButtonBaseProps>`
  border: 0;
  border-radius: 4px;
  width: 100%;
  padding: 1rem;
  color: ${(props) => props.theme['gray-100']};
  background-color: ${(props) =>
    props.theme[BUTTON_VARIANT_COLORS[props.variant]]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.125rem;

  &:disabled {
    filter: brightness(0.6);
    cursor: not-allowed;
  }

  &:not(:disabled):active {
    filter: brightness(0.8);
  }

  @media (min-width: 1248px) {
    &:not(:disabled):hover {
      filter: brightness(0.8);
    }
  }
`
