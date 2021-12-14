import React, { useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Auth } from '@aws-amplify/auth';
import { CardStyled, Container } from './styles';
import { userLogged } from '../../redux/actions/user';
// import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await Auth.signIn(email, password);
      dispatch(userLogged({ logged: true, user: response?.attributes }));
    } catch (err) {
      console.log(err);
      setError(e.message);
    }
  };

  return (
    <Container>
      <CardStyled>
        <Card.Header>
          <Card.Title>Login</Card.Title>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
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
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Entrar
            </Button>
          </Form>
          {/* <Link to={'/signUp'}>Cadastre-se</Link> */}
        </Card.Body>
      </CardStyled>
    </Container>
  );
};

export default Login;
