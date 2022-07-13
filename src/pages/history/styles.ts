import styled from 'styled-components'

export const HistoryContainer = styled.div`
  min-height: calc(100vh - 10rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  padding: 1.45rem;

  h1 {
    color: ${(props) => props.theme['gray-100']};
    align-self: flex-start;
  }
`

export const ContentWrapper = styled.div`
  width: 1100px;
  max-width: 100%;
  overflow-x: auto;
`

export const Table = styled.table`
  width: 1100px;
  border-radius: 8px;
  overflow: hidden;
  border-collapse: collapse;

  thead {
    background: ${(props) => props.theme['gray-600']};
  }

  tbody {
    background: ${(props) => props.theme['gray-700']};
  }

  tr {
    display: flex;
    td {
      border-top: 3px solid ${(props) => props.theme['gray-900']};
      color: ${(props) => props.theme['gray-300']};
    }
  }

  td,
  th {
    width: 200px;
    text-align: center;
    padding: 1rem;
    line-height: 1.6;

    &:first-child {
      flex: 1;
    }
  }
`

const STATUSES = {
  done: 'green-500',
  cancelled: 'red-500',
  processing: 'yellow-500',
} as const

type StatusType = keyof typeof STATUSES

interface StatusProps {
  status: StatusType
}

export const Status = styled.span<StatusProps>`
  color: ${(props) => props.theme['gray-100']};
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 100%;

  &::before {
    content: '';
    height: 0.5rem;
    width: 0.5rem;
    background: ${(props) => props.theme[STATUSES[props.status]]};
    border-radius: 1rem;
  }
`
