import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Auth } from '@aws-amplify/auth';
import { CardStyled, Container, LinkText } from './styles';
import { userLogged } from '../../redux/actions/user';

const ConfirmSignUp = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await Auth.confirmSignUp(email, code);
      dispatch(userLogged({ logged: true, ...response?.attributes }));
    } catch (err) {
      console.log(err);
    }
  };

  const resendCode = async (e) => {
    try {
      e.preventDefault();
      await Auth.resendSignUp(email);
      console.log('code resent successfully');
    } catch (err) {
      console.log('error resending code: ', err);
    }
  };

  return (
    <Container>
      <CardStyled>
        <Card.Header>
          <Card.Title>Confirmar Cadastro</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Digite seu email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Código</Form.Label>
              <Form.Control
                value={code}
                onChange={(event) => setCode(event.target.value)}
                type="password"
                placeholder="Digite seu código"
              />
              <Form.Text id="passwordHelpBlock" muted>
                O código é enviado ao seu email.
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Confirmar
            </Button>
          </Form>
          <LinkText onClick={resendCode}>Reenviar Código</LinkText>
        </Card.Body>
      </CardStyled>
    </Container>
  );
};

export default ConfirmSignUp;
