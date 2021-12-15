import React, { useState } from 'react';
import { Alert, Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  ButtonConfirm,
  CardStyled,
  Container,
  SimpleRow,
  Title,
} from './styles';
import { userLogged } from '../../redux/actions/user';
import loginFigure from '../../loginFigure.png';
import { user } from '../../mockedData';
// import { Link } from 'react-router-dom';
import * as API from '../../services/api';
import { POST_LOGIN } from '../../services/routes';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await API.apiPOST(POST_LOGIN, { email, password });
      if (response.has_error === false && response.data.token) {
        dispatch(userLogged({ logged: true, user: {...user, ...response.data} }));
      } else {
        setError('Email e/ou senha incorretos');
      }
    } catch (err) {
      console.log(err);
      setError(e.message);
    }
  };

  return (
    <Container>
      <img
        src={loginFigure}
        className="d-block mx-lg-auto img-fluid"
        alt="Bootstrap Themes"
        width="700"
        height="500"
        loading="lazy"
      />
      <CardStyled>
        <Card.Body style={{ border: 0 }}>
          <p
            style={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: 16,
              color: '#2D3748',
              margin: 0,
              padding: 0,
            }}
          >
            Bem vindo de volta!
          </p>
          <Title>Faça login na sua conta</Title>
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
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <SimpleRow>
                <Form.Check type="checkbox" label="Lembrar login" />
                <a href="/recuperarSenha">Esqueceu a senha?</a>
              </SimpleRow>
            </Form.Group>
            <ButtonConfirm variant="primary" type="submit">
              Login
            </ButtonConfirm>

            <p style={{ textAlign: 'center', width: '100%' }}>
              Não tem conta? <a href="#/signUp">Cadastre-se agora</a>
            </p>
          </Form>
        </Card.Body>
      </CardStyled>
    </Container>
  );
};

export default Login;
