import {
	useState,
	Dispatch,
	ReactNode,
	useEffect,
	useContext,
	createContext,
	SetStateAction
} from 'react'

import { toast } from 'react-toastify'

interface ProviderProps {
	 children: ReactNode
}

type SetState<T> = Dispatch<SetStateAction<T>>

interface ContextData {
	cycles: Cycle[]
	activeCycleId: string | null
	timePassed: number
	activeCycle:Cycle
	setActiveCycleId: SetState<string>
	setTimePassed: SetState<number>
	setCycles: SetState<Cycle[]>
	onCreateNewTask: (data: NewCycleFormData) => void
	handleStopCountdown: () => void
}

const CyclesContext = createContext({} as ContextData)

export function CyclesProvider({children}:ProviderProps) {
	const [cycles, setCycles] = useState<Cycle[]>([])
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
	const [timePassed, setTimePassed] = useState(0)

	function onCreateNewTask(data: NewCycleFormData) {
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
	
		reset()
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
	}

	const activeCycle:Cycle = cycles.find((cycle) => cycle.id === activeCycleId)

	return (
		<CyclesContext.Provider value={{
			cycles,
			setCycles,
			timePassed,
			activeCycle,
			activeCycleId,
			setTimePassed,
			onCreateNewTask,
			setActiveCycleId,
			handleStopCountdown,
		}}>
			{children}
		</CyclesContext.Provider>
	)
}

export function useCycle() {
	return useContext(CyclesContext)
}
