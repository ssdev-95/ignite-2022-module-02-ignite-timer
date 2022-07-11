import { useState, useMemo, useEffect } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { differenceInSeconds } from 'date-fns'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ToastContainer, toast } from 'react-toastify'
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

import 'react-toastify/dist/ReactToastify.css'

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'No empty task allowed'),
  minutesAmount: zod
    .number()
    .min(1, 'Task should take at least 5 minutes.')
    .max(60, 'Task cannot exceed 60 minutes.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startTime: Date
  interruptedAt?: Date
  conpletedAt?: Date
}

export function Home() {
  const { register, handleSubmit, reset, watch } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: { task: '', minutesAmount: 0 },
  })

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

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [minutes, seconds] = useMemo<string[]>(() => {
    const minutesAmountInSeconds = activeCycleId
      ? activeCycle.minutesAmount * 60
      : 0

    const currentSeconds = minutesAmountInSeconds - timePassed

    const minutes = Math.floor(currentSeconds / 60)
    const seconds = currentSeconds % 60

    return [String(minutes).padStart(2, '0'), String(seconds).padStart(2, '0')]
  }, [timePassed])

  useEffect(() => {
    let interval: Interval

    if (activeCycle) {
      interval = setInterval(() => {
        const time = differenceInSeconds(new Date(), activeCycle.startTime)
        if (activeCycle.minutesAmount * 60 === time) {
          setCycles((prev) =>
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

          setActiveCycleId(null)
          setTimePassed(0)

          toast.success('Cycle completed!', {
            position: 'top-left',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        } else {
          setTimePassed(time)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [activeCycle])

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

    toast.error('Cycle aborted!', {
      position: 'top-left',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

    setActiveCycleId(null)
    setTimePassed(0)
  }

  const task = watch('task')
  const minutesAmount = watch('minutesAmount')
  const isSubmitDisabled = !task.length || !minutesAmount
  return (
    <>
      <HomeContainer>
        <form onSubmit={handleSubmit(onCreateNewTask)}>
          <FormContainer>
            <label htmlFor="task">I&apos;ll study</label>
            <TextInput
              id="task"
              placeholder="Deploy na sexta."
              list="tasks"
              disabled={!!activeCycle}
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
              {...register('minutesAmount', {
                valueAsNumber: true,
              })}
            />
            <span>minutes.</span>
          </FormContainer>

          <CountdownWrapper>
            <div>
              <span>{minutes[0]}</span>
              <span>{minutes[1]}</span>
            </div>

            <Separator>:</Separator>

            <div>
              <span>{seconds[0]}</span>
              <span>{seconds[1]}</span>
            </div>
          </CountdownWrapper>
          {activeCycle ? (
            <Button onClick={handleStopCountdown} variant="danger">
              <HandPalm size={24} />
              Stop
            </Button>
          ) : (
            <Button disabled={isSubmitDisabled} variant="default">
              <Play size={24} />
              Start
            </Button>
          )}
        </form>
      </HomeContainer>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        theme="colored"
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
