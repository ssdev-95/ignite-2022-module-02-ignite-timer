import * as zod from 'zod'
import { newCycleFormSchema } from '../pages/home'

declare namespace Home {
	export type NewCycleFormData = zod.infer<typeof newCycleFormSchema>

	export interface Cycle {
		id: string
		task: string
		minutesAmount: number
		startTime: Date
		interruptedAt?: Date
		conpletedAt?: Date
	}
}
