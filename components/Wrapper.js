import { Container } from "react-bootstrap";

export default function Wrapper(props) {
  const childrenEl = props.childrenElement;

  return(
    <main style={{ marginTop: "58px"}}>
      <Container className="pt-4">
        { childrenEl }
    </Container>
    </main>
  )
}