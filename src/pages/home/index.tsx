import { Play } from 'phosphor-react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  Button,
  TextInput,
  Separator,
  FormContainer,
  HomeContainer,
  CountdownWrapper,
  MinuteAmountInput,
} from './styles'

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'No empty task allowed'),
  minutesAmount: zod
    .number()
    .min(5, 'Task should take at least 5 minutes.')
    .max(60, 'Task cannot exceed 60 minutes.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormSchema>

export function Home() {
  const options = ['Deploy na sexta', 'TDD', 'Docker', 'XGH']
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: { task: '', minutesAmount: 0 },
  })

  function onCreateNewTask(data: any) {
    alert(JSON.stringify(data))
    reset()
  }

  const task = watch('task')
  const minutesAmount = watch('minutesAmount')
  const isSubmitDisabled = !task.length || !minutesAmount
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(onCreateNewTask)}>
        <FormContainer>
          <label htmlFor="task">I&apos;ll study</label>
          <TextInput
            id="task"
            placeholder="Deploy na sexta."
            list="tasks"
            {...register('task')}
          />
          <datalist id="tasks">
            {options.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </datalist>
          <label htmlFor="minutesAmount">for</label>
          <MinuteAmountInput
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            id="minutesAmount"
            {...register('minutesAmount', {
              valueAsNumber: true,
            })}
          />
          <span>minutes.</span>
        </FormContainer>

        <CountdownWrapper>
          <div>
            <span>0</span>
            <span>0</span>
          </div>

          <Separator>:</Separator>

          <div>
            <span>0</span>
            <span>0</span>
          </div>
        </CountdownWrapper>

        <Button disabled={isSubmitDisabled} variant="default">
          <Play size={24} />
          Start
        </Button>
      </form>
    </HomeContainer>
  )
}
