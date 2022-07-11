import { useEffect } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { differenceInSeconds } from 'date-fns'
import { useForm } from 'react-hook-form'
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

export function Home() {
  const { register, handleSubmit, reset, watch } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: { task: '', minutesAmount: 0 },
  })

	const {
		cycles,
		setCycles,
		timePassed,
		activeCycle,
		activeCycleId,
		setTimePassed,
		setActiveCycleId
	} = useCycle()

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

  const task = watch('task')
  const minutesAmount = watch('minutesAmount')
  const isSubmitDisabled = !task.length || !minutesAmount
  return (
    <>
      <HomeContainer>
        <form onSubmit={handleSubmit(onCreateNewTask)}>
          <FormControll register={register} />

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
