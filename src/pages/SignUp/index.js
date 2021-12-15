import React, { useState } from 'react';
import { Alert, Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ButtonConfirm, CardStyled, Container, Title } from './styles';
import { userLogged } from '../../redux/actions/user';
import loginFigure from '../../loginFigure.png';
import { apiPOST } from '../../services/api';
import { POST_USER } from '../../services/routes';
import { user } from '../../mockedData';

const SignUp = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (data.password !== data.confirmPassword) {
        setError('Senhas digitadas não são iguais.');
        return;
      }
      if (!data.name && !data.phone && !data.email && !data.password) {
        setError('Por favor, preencha os campos.');
        return;
      }
      const response = await apiPOST(POST_USER, {
        name: data.name,
        username: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
      });
      if (response.has_error) {
        setError('Algo deu errado, tente novamente.');
        return;
      }
      dispatch(userLogged({ logged: true, user: {...user, ...response.data} }));
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
            Bem vindo!
          </p>
          <Title>Faça seu cadastro agora</Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                value={data.name}
                onChange={(event) =>
                  setData({ ...data, name: event.target.value })
                }
                type="text"
                placeholder="Digite seu nome"
              />
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                value={data.phone}
                onChange={(event) =>
                  setData({ ...data, phone: event.target.value })
                }
                type="text"
                placeholder="Digite seu número do celular"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={data.email}
                onChange={(event) =>
                  setData({ ...data, email: event.target.value })
                }
                type="email"
                placeholder="Digite seu email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                value={data.password}
                onChange={(event) =>
                  setData({ ...data, password: event.target.value })
                }
                type="password"
                placeholder="Digite sua senha"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Repetir Senha</Form.Label>
              <Form.Control
                value={data.confirmPassword}
                onChange={(event) =>
                  setData({ ...data, confirmPassword: event.target.value })
                }
                type="password"
                placeholder="Digite sua senha novamente"
              />
            </Form.Group>
            <ButtonConfirm variant="primary" type="submit">
              Cadastrar
            </ButtonConfirm>

            <p style={{ textAlign: 'center', width: '100%' }}>
              Já tem conta? <a href="#/home">Faça login aqui</a>
            </p>
          </Form>
        </Card.Body>
      </CardStyled>
    </Container>
  );
};

export default SignUp;
