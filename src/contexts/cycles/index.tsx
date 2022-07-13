import {
  useState,
  ReactNode,
  useReducer,
  useContext,
  createContext,
} from 'react'

import { toast } from 'react-toastify'

import { Cycle, cyclesReducer } from './reducers'
import { ActionTypes } from './actions'

interface ProviderProps {
  children: ReactNode
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
  const [timePassed, setTimePassed] = useState(0)

  /*const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)*/

  const [cycleState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const { activeCycleId, cycles } = cycleState

  function onCreateNewTask(data: Omit<Cycle, 'startTime'>) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startTime: new Date(),
    }

    /*setCycles((prev) => [...prev, newCycle])
    setActiveCycleId(id)*/
    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE_ACTION,
      payload: { newCycle },
    })

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
    /*setCycles((prev) =>
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

    setActiveCycleId(null)*/
    dispatch({
      type: ActionTypes.INTERRUPT_CYCLE_ACTION,
    })
    setTimePassed(0)
  }

  function handleStopCountdown() {
    /*setCycles((prev) =>
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

    setActiveCycleId(null)*/
    dispatch({
      type: ActionTypes.COMPLETE_CYCLE_ACTION,
    })
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

/*
enum ActionTypes {
	ADD_NEW_CYCLE_ACTION,
	INTERRUPT_CYCLE_ACTION,
	COMPLETE_CYCLE_ACTION
}
*/
