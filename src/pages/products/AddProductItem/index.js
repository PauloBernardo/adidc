import React, { useEffect, useState } from 'react';
import { Form, Button, Col, Card, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { Container } from './styles';
import * as API from '../../../services/api';
import {
  ADD_ITEM,
  LIST_TIMELINE,
  ADD_ITEM_BATCH,
} from '../../../services/routes';

export function AddProductItem() {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const productId = useSelector((state) => state.app.product_id);
  const [timeline, setTimeline] = useState([]);
  const [tabActual, setTabActual] = useState('one');
  const [values, setValues] = useState({
    code: '',
    implications: '',
    timelineId: '',
    whattodo: 'string',
    information: '',
    productId,
    category: '',
    expected_geolocation: {
      latitude: 0,
      longitude: 0,
    },
    expiration_date: '',
    lot: '',
    name: '',
    warnings: {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if (tabActual === 'one') {
      API.apiPOST(ADD_ITEM, values)
        .then((response) => {
          if (
            !response.has_error &&
            (response.response.status === 200 ||
              response.response.status === 201)
          ) {
            history.goBack();
          } else {
            alert('Houve um erro!');
            console.log(response.error.response.data);
          }
        })
        .catch(() => alert('Houve um erro!'));
    } else {
      API.apiPOST(ADD_ITEM_BATCH, {
        lot: values.lot,
        NumberItems: values.NumberItems,
        expected_geolocation: values.expected_geolocation,
        productId,
      })
        .then((response) => {
          if (
            !response.has_error &&
            (response.response.status === 200 ||
              response.response.status === 201)
          ) {
            history.goBack();
          } else {
            alert('Houve um erro!');
            console.log(response.error.response.data);
          }
        })
        .catch(() => alert('Houve um erro!'));
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!productId) history.goBack();
  }, [history]);

  useEffect(() => {
    API.apiGET(LIST_TIMELINE).then((resp) => {
      if (resp.has_error) {
        alert(resp.error);
      } else {
        setTimeline(resp.response.data.data);
      }
    });
  }, []);

  return (
    <Container>
      <Card.Header>
        <Card.Title>Cadastrar Item de Produto</Card.Title>
      </Card.Header>
      <Nav fill variant="tabs" defaultActiveKey="1">
        <Nav.Item onClick={() => setTabActual('one')}>
          <Nav.Link eventKey="1">Item específico</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => setTabActual('multiple')}>
          <Nav.Link eventKey="2">Cadastro em lote</Nav.Link>
        </Nav.Item>
      </Nav>
      <br />
      <Card.Body>
        <Form noValidate onSubmit={handleSubmit}>
          {tabActual === 'one' ? (
            <>
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
                <Form.Group as={Col} md="4" controlId="validationFormik101">
                  <Form.Label>Lote</Form.Label>
                  <Form.Control
                    type="text"
                    name="lot"
                    value={values.lot}
                    onChange={handleChange}
                    isValid={values.lot && !errors.lot}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik102">
                  <Form.Label>Informação</Form.Label>
                  <Form.Control
                    type="text"
                    name="information"
                    value={values.information}
                    onChange={handleChange}
                    isValid={values.information && !errors.information}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationFormik101">
                  <Form.Label>Data de validade</Form.Label>
                  <Form.Control
                    type="date"
                    name="expiration_date"
                    value={values.expiration_date}
                    onChange={handleChange}
                    isValid={values.expiration_date && !errors.expiration_date}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik102">
                  <Form.Label>Implicações</Form.Label>
                  <Form.Control
                    type="text"
                    name="implications"
                    value={values.implications}
                    onChange={handleChange}
                    isValid={values.implications && !errors.implications}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationFormik102">
                  <Form.Label>Timeline</Form.Label>
                  <Form.Control
                    as="select"
                    type="text"
                    name="timelineId"
                    value={values.timelineId}
                    onChange={handleChange}
                    isValid={values.timelineId && !errors.timelineId}
                  >
                    {timeline.map((t) => {
                      return <option value={t.id}>{t.name}</option>;
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik102">
                  <Form.Label>Código</Form.Label>
                  <Form.Control
                    as="select"
                    type="text"
                    name="code"
                    value={values.code}
                    onChange={handleChange}
                    isValid={values.code && !errors.code}
                  >
                    {timeline
                      .find((t) => t.id === values.timelineId)
                      ?.events.map((e) => {
                        return <option value={e.code}>{e.description}</option>;
                      })}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationFormik102">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control
                    type="number"
                    name="expected_geolocation.latitude"
                    value={values.expected_geolocation.latitude}
                    onChange={(e) => {
                      const expectedGeolocation = {
                        ...values.expected_geolocation,
                        latitude: e.target.value,
                      };
                      setValues({
                        ...values,
                        expected_geolocation: expectedGeolocation,
                      });
                    }}
                    isValid={values.latitude && !errors.latitude}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik102">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control
                    type="number"
                    name="expected_geolocation.longitude"
                    value={values.expected_geolocation.longitude}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        expected_geolocation: {
                          ...values.expected_geolocation,
                          longitude: e.target.value,
                        },
                      })
                    }
                    isValid={values.longitude && !errors.longitude}
                  />
                </Form.Group>
              </Form.Row>
            </>
          ) : (
            <>
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationFormik101">
                  <Form.Label>Lote</Form.Label>
                  <Form.Control
                    type="text"
                    name="lot"
                    value={values.lot}
                    onChange={handleChange}
                    isValid={values.lot && !errors.lot}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik101">
                  <Form.Label>Número de itens no lote</Form.Label>
                  <Form.Control
                    type="number"
                    name="NumberItems"
                    value={values.NumberItems}
                    onChange={handleChange}
                    isValid={values.NumberItems && !errors.NumberItems}
                  />
                </Form.Group>
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="validationFormik102">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control
                      type="number"
                      name="expected_geolocation.latitude"
                      value={values.expected_geolocation.latitude}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          expected_geolocation: {
                            ...values.expected_geolocation,
                            latitude: e.target.value,
                          },
                        })
                      }
                      isValid={values.latitude && !errors.latitude}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik102">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                      type="number"
                      name="expected_geolocation.longitude"
                      value={values.expected_geolocation.longitude}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          expected_geolocation: {
                            ...values.expected_geolocation,
                            longitude: e.target.value,
                          },
                        })
                      }
                      isValid={values.longitude && !errors.longitude}
                    />
                  </Form.Group>
                </Form.Row>
              </Form.Row>
            </>
          )}
          <Button type="submit">Adicionar</Button>
        </Form>
      </Card.Body>{' '}
      :
    </Container>
  );
}
