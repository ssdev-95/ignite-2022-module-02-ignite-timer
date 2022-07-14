import { FC, ReactElement, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './src/styles/global-styles'

import { defaultTheme } from './src/styles/themes/default-theme'

import { render, RenderOptions } from '@testing-library/react'

import { ProviderProps, CyclesProvider } from './src/contexts/cycles'

const AllTheProviders: FC<ProviderProps> = ({ children }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesProvider>{children}</CyclesProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}

const customRenderer = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
