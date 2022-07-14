import { jest } from '@jest/globals'

import { render, cleanup, fireEvent } from '../../../__test__/utils'

import { Button } from '../button'

beforeEach(cleanup)

describe('should sum 1 + 1', () => {
  it('sum should return 2', () => {
    expect(1 + 1).toEqual(2)
  })

  it('should have been clicked', () => {
    const clickMockFunction = jest.fn()
    const { getByText } = render(
      <Button title="Start" onClick={clickMockFunction} />
    )

    fireEvent.click(getByText('Start'))

    expect(clickMockFunction).toBeCalled()
  })
})
