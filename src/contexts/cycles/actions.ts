import { Cycle, CycleReducerState } from './reducers'

export interface Action {
	type: string
	payload?: { newCycle: Cycle }
}

export enum ActionTypes {
  ADD_NEW_CYCLE_ACTION = 'ADD_NEW_CYCLE_ACTION',
  INTERRUPT_CYCLE_ACTION = 'INTERRUPT_CYCLE_ACTION',
  COMPLETE_CYCLE_ACTION = 'COMPLETE_CYCLE_ACTION',
}

export function addNewCycleAction(
	state: CycleReducerState,
	{ payload: { newCycle } }: Action
) {
	try {
	return {
		activeCycleId: newCycle.id,
		cycles: [...state.cycles, newCycle],
	}
	} catch(err: Error) {
		alert(JSON.stringify(newCycle))
		return state
	}
}

export function interruptCycleAction(
	state: CycleReducerState
) {
	return {
		cycles: state.cycles.map((cycle) => {
			if (cycle.id === state.activeCycleId) {
				return {
					...cycle,
					interruptedAt: new Date(),
				}
			}

			return cycle
		}),
		activeCycleId: null,
	}
}

export function completeCycleAction(
	state: CycleReducerState
) {
	return {
		cycles: state.cycles.map((cycle) => {
			if (cycle.id === state.activeCycleId) {
				return {
					...cycle,
					completedAt: new Date(),
				}
			}

			return cycle
		}),
		activeCycleId: null,
	}
}
