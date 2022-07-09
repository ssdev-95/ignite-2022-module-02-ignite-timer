import { Table, Status, ContentWrapper, HistoryContainer } from './styles'

export function History() {
  const tasks = [
    {
      id: 'qidjdnwkw9fuc_782n',
      name: 'Study XGH',
      duration: '30 minutes',
      start: '3 days ago',
      status: 'Cancelled',
    },
    {
      id: 'qidIwbUkw9fuc_7a2n',
      name: 'Ignite time',
      duration: '30 minutes',
      start: '1 minute ago',
      status: 'Processing',
    },
    {
      id: 'h3828zhejd9uc_n13x',
      name: 'Networking',
      duration: '25 minutes',
      start: '1 month ago',
      status: 'Done',
    },
  ]

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
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.duration}</td>
                <td>{task.start}</td>
                <td>
                  <Status status={task.status.toLowerCase()}>
                    {task.status}
                  </Status>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ContentWrapper>
    </HistoryContainer>
  )
}
