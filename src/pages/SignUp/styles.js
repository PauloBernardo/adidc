import styled from "styled-components"
import {Card} from "react-bootstrap";


export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #61dafb;
  justify-items: center;
  justify-content: center;
  align-items: center;
`;

export const CardStyled = styled(Card)`
  display: flex;
  width: 50%;
  min-width: 300px;
  max-width: 500px;
`;