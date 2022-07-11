import { useMemo } from 'react'
import { useCycle } from '../../contexts/cycles'

import { Separator, CountdownWrapper } from './styles'

export function CountdownTimer() {
  const {
		timePassed,
		activeCycle,
		activeCycleId
	} = useCycle()

  const [minutes, seconds] = useMemo<string[]>(() => {
    const minutesAmountInSeconds = activeCycleId
      ? activeCycle.minutesAmount * 60
      : 0

    const currentSeconds = minutesAmountInSeconds - timePassed

    const minutes = Math.floor(currentSeconds / 60)
    const seconds = currentSeconds % 60

    return [String(minutes).padStart(2, '0'), String(seconds).padStart(2, '0')]
  }, [timePassed])

  return (
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
  )
}
