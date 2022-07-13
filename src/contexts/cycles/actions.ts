import { produce } from 'immer'

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
  return produce(state, (draft) => {
		draft.cycles.push(newCycle)
		draft.activeCycleId = newCycle.id
  })
}

export function interruptCycleAction(
	state: CycleReducerState
) {
	const activeCycleIndex = state.cycles.findIndex(
		cycle => cycle.id === state.activeCycleId
	)

	if(activeCycleIndex === -1) {
		return state
	}

	return produce(state, (draft) => {
		draft
		 .cycles[activeCycleIndex]
		 .interruptedAt = new Date()
		draft.activeCycleId = null
	})
}

export function completeCycleAction(
	state: CycleReducerState
) {
	const activeCycleIndex = state.cycles.findIndex(
		cycle => cycle.id === state.activeCycleId
	)

	if(activeCycleIndex === -1) {
		return state
	}

  return produce(state, (draft) => {
		draft
		  .cycles[activeCycleIndex]
			.completedAt = new Date()
		draft.activeCycleId = null
	})
}
