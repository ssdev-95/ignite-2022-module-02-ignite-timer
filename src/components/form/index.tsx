import { useCycle } from '../../contexts/cycles'

import { TextInput, FormContainer, MinuteAmountInput } from './styles'

export function FormControll({ register }: any) {
  const { activeCycle, cycles } = useCycle()

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
