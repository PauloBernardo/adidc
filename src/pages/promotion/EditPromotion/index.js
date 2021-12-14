import React, { useEffect, useState } from 'react';
import { Form, Button, Col, Card } from 'react-bootstrap';
import { Container } from './styles';
import * as API from '../../../services/api';
import { InputMultiple } from '../../../components/InputMultiple';
import { ADD_PRODUCT, GET_PROMOTION, UPDATE_PRODUCT, UPDATE_PROMOTION } from '../../../services/routes';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

export function EditPromotion(props) {
  const editProduct = props.location.state?.detail;
  const [values, setValues] = useState({
    image: 'string',
    link: 'string',
    title: 'string',
    data: {
      description: 'string',
      prizes: [
        {
          description: 'string',
          image: 'string',
        },
      ],
      terms: 'string',
      uri: 'string',
    },
  });
  const [promotion, setPromotion] = useState({});
  const promotion_id = useSelector((state) => state.app.promotion_id);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editProduct) {
      API.apiPATCH(
        UPDATE_PROMOTION + "?id=" + promotion_id,
        values
      )
        .then((response) => {
          console.log(JSON.stringify(response));
          if (!response.has_error && response.response.status === 201) {
            history.goBack();
          }
        })
        .catch(() => alert('Houve um erro!'));
    } else {
      console.log(values);
      API.apiPOST(ADD_PRODUCT, values)
        .then((response) => {
          if (!response.has_error && response.response.status === 201) {
            history.goBack();
          }
        })
        .catch(() => alert('Houve um erro!'));
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    API.apiGET(
      GET_PROMOTION.replace('{id}', encodeURIComponent(promotion_id))
    ).then((resp) => {
      if (resp.has_error) {
        alert(resp.error);
        console.log(resp.error.response);
      } else {
        console.log(resp.response.data);
        setPromotion({ ...resp.response.data, ...resp.response.data.data });
      }
    });
  }, [])

  return (
    <Container>
      <Card.Header>
        <Card.Title>
          Editar Promoção
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationFormik102">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                isValid={values.name && !errors.description}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik101">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={values.category}
                onChange={handleChange}
                isValid={values.category && !errors.category}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik102">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                isValid={values.description && !errors.description}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationFormik101">
              <Form.Label>Imagem</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={values.image}
                onChange={handleChange}
                isValid={values.image && !errors.category}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik102">
              <Form.Label>Manual</Form.Label>
              <Form.Control
                type="text"
                name="manual"
                value={values.manual}
                onChange={handleChange}
                isValid={values.manual && !errors.description}
              />
            </Form.Group>
          </Form.Row>
          <InputMultiple
            onChange={(value) => {
              console.log(value);
              setValues({ ...values, ['videos']: value });
            }}
            editValues={editProduct?.videos}
            name={'videos'}
            type={'text'}
            title={'Vídeos'}
          />
          <InputMultiple
            onChange={(value) => {
              console.log(value);
              setValues({ ...values, ['precautions']: value });
            }}
            editValues={editProduct?.precautions}
            name={'precautions'}
            type={'text'}
            title={'Preucações'}
          />
          <Button type="submit">{editProduct ? 'Editar' : 'Adicionar'}</Button>
        </Form>
      </Card.Body>
    </Container>
  );
}
