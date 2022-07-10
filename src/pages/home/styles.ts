import styled from 'styled-components'

export const HomeContainer = styled.main`
  width: 1100px;
  max-width: 85vw;
  margin: 3rem auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;

  background-color: ${(props) => props.theme['gray-700']};
  padding: 2rem;
  border-radius: 8px;
`

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;

  label {
    font-size: 1.125rem;
  }
`

export const BaseInput = styled.input`
  background-color: ${(props) => props.theme['gray-900']};

  outline: none;
  border: 0;
  height: 2rem;
  font-size: 1.125rem;
  line-height: 1.6;

  border-bottom: 2px solid ${(props) => props.theme['gray-300']};
  color: ${(props) => props.theme['gray-100']};

  &:focus {
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-300']};
  }
`

export const TextInput = styled(BaseInput)`
  text-indent: 1rem;
  flex: 1;
`

export const MinuteAmountInput = styled(BaseInput)`
  width: 60px;
  text-align: center;
`

export const CountdownWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  span {
    font-size: 10rem;
    font-family: "Roboto Mono", monospace;
    line-height: 1.6;

    @media (max-width: 869px) {
      line-height: 1.2;
    }
  }
`

export const Separator = styled.span`
  color: ${(props) => props.theme['green-300']};
  font-family: "Roboto Mono", monospace;

  @media (max-width: 800px) {
    display: none;
  }
`

const BUTTON_VARIANT_COLORS = {
  default: 'green-300',
  danger: 'red-500',
} as const

type ButtonVariant = keyof typeof BUTTON_VARIANT_COLORS

interface ButtonProps {
  variant: ButtonVariant
}

export const Button = styled.button<ButtonProps>`
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
