import styled from 'styled-components'

export const HeaderContainer = styled.header`
  padding: 1.85rem 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme['gray-300']};

  & > .logo {
    color: ${(props) => props.theme['green-500']};
  }

  & > nav {
    diaplay: flex;
    gap: 1rem;

    a {
      color: ${(props) => props.theme['gray-300']};
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      text-decoration: none;

      &.active {
        color: ${(props) => props.theme['green-300']};
      }

      &:hover {
        color: ${(props) => props.theme['green-300']};
        border-bottom: 3px solid ${(props) => props.theme['green-500']};
      }
    }
  }
`
