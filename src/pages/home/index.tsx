import { HomeContainer } from "./styles"

export function Home() {
  try {
    return (
      <HomeContainer>
        <h1>Home</h1>
      </HomeContainer>
    )
  } catch (err) {
    return <h3>{err}</h3>
  }
}
