import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: white;
  justify-items: center;
  justify-content: space-around;
  align-items: center;
`;

export const CardStyled = styled.div`
  display: flex;
  width: 50%;
  max-height: 380px;
  min-width: 250px;
  max-width: 400px;
  margin-right: 200px;
`;

export const Title = styled.h1`
  font-family: Roboto, serif;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 35px;
  margin-bottom: 20px;
  /* 900 */
  color: #1a202c;
`;

export const ButtonConfirm = styled(Button)`
  background: #04c45c;
  border-radius: 5px;

  font-family: Roboto, serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  border: 1px solid green;
  padding: 10px;
  width: 100%;
  /* identical to box height */

  color: #ffffff;
  margin-bottom: 50px;
`;

export const SimpleRow = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;
