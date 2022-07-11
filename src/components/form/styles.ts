import styled from 'styled-components'

export const FormContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	flex-wrap: wrap;

	label {
		font-size: 1.125rem;
	}
`

export const BaseInput = styled.input`
	background-color: ${(props) => props.theme['gray-900']};
	outline: none;
	border: 0;
	height: 2rem;
	font-size: 1.125rem;
	line-height: 1.6;

	border-bottom: 2px solid ${(props) => props.theme['gray-300']};
	color: ${(props) => props.theme['gray-100']};

	&:focus {
		box-shadow: none;
		border-bottom: 2px solid ${(props) => props.theme['green-500']};
	}

	&::placeholder {
		color: ${(props) => props.theme['gray-300']};
	}
`

export const TextInput = styled(BaseInput)`
	text-indent: 1rem;
	flex: 1;
`

export const MinuteAmountInput = styled(BaseInput)`
	width: 60px;
	text-align: center;
`
