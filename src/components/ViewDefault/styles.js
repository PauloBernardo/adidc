import styled from 'styled-components';
import { Form } from 'react-bootstrap';

export const TextDefault = styled(Form.Text)`
  white-space: nowrap;
  overflow: hidden; // Removendo a barra de rolagem
  text-overflow: ellipsis; // Adicionando "..." ao final do texto
  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
`;
