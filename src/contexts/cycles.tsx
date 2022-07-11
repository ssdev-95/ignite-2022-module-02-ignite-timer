import { useState, ReactNode, useContext, createContext } from 'react'

import { toast } from 'react-toastify'

interface ProviderProps {
  children: ReactNode
}

interface Cycle {
  id: string
  minutesAmount: number
  startTime: Date
  interruptedAt?: Date
  conpletedAt?: Date
}

interface ContextData {
  cycles: Cycle[]
  activeCycleId: string | null
  timePassed: number
  activeCycle: Cycle
  updateTimePassed: (time: number) => void
  onCreateNewTask: (data: Cycle) => void
  handleStopCountdown: () => void
  onCycleComplete: () => void
}

const CyclesContext = createContext({} as ContextData)

export function CyclesProvider({ children }: ProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [timePassed, setTimePassed] = useState(0)

  function onCreateNewTask(data: Omit<Cycle, 'startTime'>) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startTime: new Date(),
    }

    setCycles((prev) => [...prev, newCycle])
    setActiveCycleId(id)
    setTimePassed(0)

    toast.success('Cycle started!', {
      position: 'top-left',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  function updateTimePassed(time: number) {
    setTimePassed(time)
  }

  function onCycleComplete() {
    setCycles((prev) =>
      prev.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            completedAt: new Date(),
          }
        }

        return cycle
      })
    )

    setActiveCycleId(null)
    setTimePassed(0)
  }

  function handleStopCountdown() {
    setCycles((prev) =>
      prev.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedAt: new Date(),
          }
        }

        return cycle
      })
    )

		setActiveCycleId(null)
		setTimePassed(0)

		toast.error('Cycle aborted!', {
			position: 'top-left',
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		})
  }

  const activeCycle: Cycle = cycles.find((cycle) => cycle.id === activeCycleId)

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        timePassed,
        activeCycle,
        activeCycleId,
        onCreateNewTask,
        onCycleComplete,
        updateTimePassed,
        handleStopCountdown,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

export function useCycle() {
  return useContext(CyclesContext)
}
