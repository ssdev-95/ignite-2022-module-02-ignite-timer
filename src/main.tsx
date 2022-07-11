import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { App } from './App'
import { GlobalStyle } from './styles/global-styles'
import { defaultTheme } from './styles/themes/default-theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={defaultTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <GlobalStyle />
  </ThemeProvider>
)
