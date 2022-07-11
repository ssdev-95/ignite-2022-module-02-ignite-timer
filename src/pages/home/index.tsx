import { useEffect } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { differenceInSeconds } from 'date-fns'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ToastContainer, toast } from 'react-toastify'
import * as zod from 'zod'

import { FormControll } from '../../components/form'
import { Button } from '../../components/button'
import { CountdownTimer } from '../../components/countdown'

import { useCycle } from '../../contexts/cycles'
import { HomeContainer } from './styles'

import 'react-toastify/dist/ReactToastify.css'

export const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'No empty task allowed'),
  minutesAmount: zod
    .number()
    .min(1, 'Task should take at least 5 minutes.')
    .max(60, 'Task cannot exceed 60 minutes.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormSchema>

export function Home() {
  const formContext = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: { task: '', minutesAmount: 0 },
  })

  const { handleSubmit, reset, watch } = formContext

  const {
    activeCycle,
    onCreateNewTask,
    onCycleComplete,
    updateTimePassed,
		handleStopCountdown,
  } = useCycle()

  useEffect(() => {
    let interval: Interval

    if (activeCycle) {
      interval = setInterval(() => {
        const time = differenceInSeconds(new Date(), activeCycle.startTime)
        if (activeCycle.minutesAmount * 60 === time) {
          onCycleComplete()

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
          updateTimePassed(time)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [activeCycle])

  const task = watch('task')
  const minutesAmount = watch('minutesAmount')
  const isSubmitDisabled = !task.length || !minutesAmount
  function handleCreateNewTask(data: NewCycleFormData) {
    try {
      onCreateNewTask(data)
      reset()
    } catch (err) {
      alert(err)
    }
  }
  return (
    <>
      <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewTask)}>
          <FormProvider {...formContext}>
            <FormControll />
          </FormProvider>

          <CountdownTimer />

          {activeCycle ? (
            <Button
              onClick={handleStopCountdown}
              variant="danger"
              type="button"
              title="Stop"
            >
              <HandPalm size={24} />
            </Button>
          ) : (
            <Button
							disabled={isSubmitDisabled}
							type="submit"
							title="Start"
						>
              <Play size={24} />
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
