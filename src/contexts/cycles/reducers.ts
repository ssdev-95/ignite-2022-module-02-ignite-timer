import {
  Action,
  ActionTypes,
  addNewCycleAction,
  completeCycleAction,
  interruptCycleAction,
} from './actions'

export interface Cycle {
  id: string
  minutesAmount: number
  startTime: Date
  interruptedAt?: Date
  completedAt?: Date
}

export interface CycleReducerState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CycleReducerState, action: Action) {
  switch (action.type) {
  case ActionTypes.ADD_NEW_CYCLE_ACTION:
    return addNewCycleAction(state, action)
  case ActionTypes.INTERRUPT_CYCLE_ACTION:
    return interruptCycleAction(state)
  case ActionTypes.COMPLETE_CYCLE_ACTION:
    return completeCycleAction(state)
  default:
    return state
  }
}

/*
enum ActionTypes {
	ADD_NEW_CYCLE_ACTION,
	INTERRUPT_CYCLE_ACTION,
	COMPLETE_CYCLE_ACTION
}
*/
