import React, { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import { ButtonConfirm } from './styles';
import { setAppValue } from '../../redux/actions/app';
import { AccountIcon } from '../../components/Header/styles';

export const Configuracao = () => {
  const user = useSelector((state) => state.user.user);
  const [data, setData] = useState(user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAppValue({ current_page: 'config' }));
  }, []);

  return (
    <>
      <Header title="Configuração - Geral" />
      <Form onSubmit={(event) => event.preventDefault()}>
        <Form.Group className="mb-3" controlId="formFile">
          <AccountIcon
            style={{ margin: 10, width: 60, height: 60 }}
            src={`data:image/jpeg;base64, ${user.photo}`}
            alt="accountPhoto"
          />
          <Form.Label>Foto</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            value={data.name}
            type="text"
            onChange={(event) => setData({ ...data, name: event.target.value })}
            placeholder="Digite seu nome..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={data.email}
            type="email"
            onChange={(event) =>
              setData({ ...data, email: event.target.value })
            }
            placeholder="Digite seu email.."
          />
          <Form.Text className="text-muted">
            Este email também será usado para envio de alertas.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Celular</Form.Label>
          <Form.Control
            value={data.phone}
            type="text"
            onChange={(event) =>
              setData({ ...data, phone: event.target.value })
            }
            placeholder="Digite o número do seu celular..."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Meio de alertas</Form.Label>
          <Form.Check
            checked={data.notification_ways
              .split(',')
              .find((way) => way.trim() === 'email')}
            onChange={(value) => {
              const type = data.notification_ways
                .split(',')
                .find((way) => way.trim() === 'email');
              if (type) {
                setData({
                  ...data,
                  notification_ways: data.notification_ways.replace(type, ''),
                });
              } else {
                setData({
                  ...data,
                  notification_ways: `${data.notification_ways}, email`,
                });
              }
              console.log(value);
            }}
            type="checkbox"
            label="Email"
          />
          <Form.Check
            checked={data.notification_ways
              .split(',')
              .find((way) => way.trim() === 'sms')}
            onChange={(value) => {
              const type = data.notification_ways
                .split(',')
                .find((way) => way.trim() === 'sms');
              if (type) {
                setData({
                  ...data,
                  notification_ways: data.notification_ways.replace(type, ''),
                });
              } else {
                setData({
                  ...data,
                  notification_ways: `${data.notification_ways}, sms`,
                });
              }
              console.log(value);
            }}
            type="checkbox"
            label="SMS"
          />
        </Form.Group>
        <ButtonConfirm disabled={user === data} variant="primary" type="submit">
          Salvar Alterações
        </ButtonConfirm>
      </Form>
    </>
  );
};
