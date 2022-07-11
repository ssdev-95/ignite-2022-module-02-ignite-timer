import { useFormContext } from 'react-hook-form'

import { useCycle } from '../../contexts/cycles'

import { TextInput, FormContainer, MinuteAmountInput } from './styles'

interface Cycle {
  id: string
  minutesAmount: number
  startTime: Date
  interruptedAt?: Date
  conpletedAt?: Date
}

export function FormControll() {
  const { activeCycle, cycles } = useCycle()
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">I&apos;ll study</label>

      <TextInput
        id="task"
        placeholder="Deploy na sexta."
        list="tasks"
        disabled={!!activeCycle}
        autoComplete="off"
        {...register('task')}
      />

      <datalist id="tasks">
        {cycles.map((cycle: Cycle) => (
          <option key={cycle.id} value={cycle.task}>
            {cycle.task}
          </option>
        ))}
      </datalist>

      <label htmlFor="minutesAmount">for</label>

      <MinuteAmountInput
        type="number"
        placeholder="00"
        step={1}
        min={1}
        max={60}
        id="minutesAmount"
        disabled={!!activeCycle}
        autoComplete="off"
        {...register('minutesAmount', {
          valueAsNumber: true,
        })}
      />

      <span>minutes.</span>
    </FormContainer>
  )
}
