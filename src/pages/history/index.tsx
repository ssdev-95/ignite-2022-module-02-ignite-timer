import { formatDistanceToNow } from 'date-fns'
import { useCycle } from '../../contexts/cycles'

import { Table, Status, ContentWrapper, HistoryContainer } from './styles'

interface Cycle {
  id: string
  minutesAmount: number
  startTime: Date
  interruptedAt?: Date
  conpletedAt?: Date
}

export function History() {
  const { cycles } = useCycle()

  return (
    <HistoryContainer>
      <h1>Past tasks</h1>
      <ContentWrapper>
        <Table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle: Cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutes</td>
                <td>
                  {formatDistanceToNow(cycle.startTime, { addSuffix: true })}
                </td>
                <td>
                  {cycle.interruptedAt && (
                    <Status status="cancelled">Aborted</Status>
                  )}
                  {cycle.completedAt && <Status status="done">Done</Status>}
                  {!cycle.interruptedAt && !cycle.completedAt && (
                    <Status status="processing">Processing</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ContentWrapper>
    </HistoryContainer>
  )
}
// STATUSES = ['done', 'cancelled', 'processing']
