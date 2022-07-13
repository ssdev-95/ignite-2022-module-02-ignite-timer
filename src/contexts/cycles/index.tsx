import {
  useState,
  useEffect,
  ReactNode,
  useReducer,
  useContext,
  createContext,
} from 'react'

import { differenceInSeconds } from 'date-fns'

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

const storeKey = '@ignite-timero:cycle-state-1.0.0'

const CyclesContext = createContext({} as ContextData)

export function CyclesProvider({ children }: ProviderProps) {
  const [cycleState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedCycleState = localStorage.getItem(storeKey)

      if (storedCycleState) {
        return JSON.parse(storedCycleState)
      }
    }
  )

  const { activeCycleId, cycles } = cycleState
  const activeCycle: Cycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [timePassed, setTimePassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startTime))
    }

    return 0
  })

  useEffect(() => {
    const cyclesJSON = JSON.stringify(cycleState)
    localStorage.setItem(storeKey, cyclesJSON)
  }, [cycleState])

  function updateTimePassed(time: number) {
    setTimePassed(time)
  }

  function onCreateNewTask(data: Omit<Cycle, 'startTime'>) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startTime: new Date(),
    }

    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE_ACTION,
      payload: { newCycle },
    })

    updateTimePassed(data.minutesAmount * 60)

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

  function onCycleComplete() {
    dispatch({
      type: ActionTypes.COMPLETE_CYCLE_ACTION,
    })
    setTimePassed(0)
  }

  function handleStopCountdown() {
    dispatch({
      type: ActionTypes.INTERRUPT_CYCLE_ACTION,
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
