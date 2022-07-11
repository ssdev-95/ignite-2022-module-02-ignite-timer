import { Router } from './Router'
import { CyclesProvider } from './contexts/cycles'

export function App() {
  return (
    <CyclesProvider>
      <Router />
    </CyclesProvider>
  )
}
