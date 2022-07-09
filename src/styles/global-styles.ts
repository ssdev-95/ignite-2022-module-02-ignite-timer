import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Roboto', sans-serif;

		&:focus {
			box-shadow: 0 0 0 2px ${(props) => props.theme["green-300"]};
		}

		scroll-behavior: smooth;
		-webkit-font-smoothing: antialiased;
	}

  body {
		background: ${(props) => props.theme["gray-900"]};
		color: ${(props) => props.theme.white};
	}
`
