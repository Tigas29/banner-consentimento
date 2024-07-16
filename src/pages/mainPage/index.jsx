import styled from "styled-components";

export default function MainPage() {
  const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `;

  return (
    <Container>
      <h1>Main Page</h1>
      <p>
        Lembrando que o texto que ta na parte do cookie, é apenas uma
        demonstração :)
      </p>
    </Container>
  );
}
