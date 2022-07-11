import styled from 'styled-components'

export const CountdownWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;

	span {
		font-size: 10rem;
		font-family: "Roboto Mono", monospace;
		line-height: 1.6;

		@media (max-width: 869px) {
			line-height: 1.2;
		}
	}
`

export const Separator = styled.span`
	color: ${(props) => props.theme['green-300']};
	font-family: "Roboto Mono", monospace;

	@media (max-width: 800px) {
		display: none;
	}
`
