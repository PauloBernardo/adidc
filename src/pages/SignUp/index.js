import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Auth } from '@aws-amplify/auth';
import { useHistory } from 'react-router';
import { userLogged } from '../../redux/actions/user';
import { CardStyled, Container } from './styles';

const SignUp = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (confirmPassword !== password) return alert('Senha devem ser iguais!');
      const username = email;
      const response = await Auth.signUp({
        username,
        password,
        attributes: { email },
      });
      dispatch(
        userLogged({ logged: response.userConfirmed, ...response?.user })
      );
      if (!response.userConfirmed) {
        history.push('/confirmSignUp');
      }
    } catch (error) {
      console.log(error);
    }
    return 1;
  };

  return (
    <Container>
      <CardStyled>
        <Card.Header>
          <Card.Title>SignUp</Card.Title>
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
              <Form.Label>Senha</Form.Label>
              <Form.Control
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Digite sua senha"
                required
                isInvalid={password && password.length === 0}
              />
              <Form.Control.Feedback type="invalid">
                A senha é necessária.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirmar senha</Form.Label>
              <Form.Control
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                type="password"
                placeholder="Digite sua senha"
                required
                isInvalid={confirmPassword !== password}
              />
              <Form.Control.Feedback type="invalid">
                A duas senhs devem ser iguais.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Cadastrar
            </Button>
          </Form>
        </Card.Body>
      </CardStyled>
    </Container>
  );
};

export default SignUp;
