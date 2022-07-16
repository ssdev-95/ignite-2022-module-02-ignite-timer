/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from 'vitest'
import {
  screen,
  render,
  //fireEvent
} from '../../test/utils'

import { Button } from '../button'
import { FormControll } from '../form'

describe('start button should work correctly', () => {
  //const clickMockFunction = jest.fn()

  it('sum should return 2', () => {
    expect(1 + 1).toEqual(2)
  })

  it('button should appear in the DOM', () => {
    render(<Button title="Start" />)

    expect(screen.getByRole('button', {name:/Start/i})).toBeInTheDocument()
  })
})
