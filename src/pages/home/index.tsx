//import { FormEvent } from 'react'
import { Play } from 'phosphor-react'

import {
  Button,
  TextInput,
  Separator,
  FormContainer,
  HomeContainer,
  CountdownWrapper,
  MinuteAmountInput,
} from './styles'

export function Home() {
  const options = ['Deploy na sexta', 'TDD', 'Docker', 'XGH']

  return (
    <HomeContainer>
      <form onSubmit={(e) => e.preventDefault()}>
        <FormContainer>
          <label htmlFor="task">I&apos;ll study</label>
          <TextInput id="task" placeholder="Deploy na sexta." list="tasks" />
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
            max="999"
            id="minutesAmount"
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

        <Button variant="default">
          <Play size={24} />
          Start
        </Button>
      </form>
    </HomeContainer>
  )
}
