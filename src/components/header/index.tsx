import { NavLink } from 'react-router-dom'
import {
	Timer,
	Coffee,
	Scroll
} from 'phosphor-react'
import { HeaderContainer } from './styles'

export function Header() {
	return (
		<HeaderContainer>
			<Coffee size={46} className="logo" />
			<nav>
				<NavLink to="/" title="Timer">
					<Timer size={46} />
				</NavLink>
				<NavLink to="/history" title="History">
					<Scroll size={46} />
				</NavLink>
			</nav>
		</HeaderContainer>
	)
}
