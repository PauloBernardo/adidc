import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Nav } from 'react-bootstrap';
import * as API from '../../services/api';
import {
  CREATE_ITEM_EVENT,
  CREATE_PACK_EVENT,
  LIST_TIMELINE,
} from '../../services/routes';

export const AddEvent = ({ itemID, type, onChange }) => {
  const [tabActual, setTabActual] = useState('owner');
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [timeline, setTimeline] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    let data = {};
    switch (tabActual) {
      case 'owner':
        data = { owner_id: values.owner };
        break;
      case 'holder':
        data = { holder_id: values.holder_id };
        break;
      case 'location':
        data = {
          location: {
            timelineId: values.timelineId,
            code: values.code,
            latitude: Number(values.latitude),
            longitude: Number(values.longitude),
            information: values.information,
          },
        };
        break;
      case 'alarm':
        data = {
          alarm: {
            timelineId: values.timelineId,
            code: values.code,
            whattodo: values.whattodo,
            implications: values.implications,
          },
        };
        break;
      default:
        return null;
    }
    setIsLoading(true);

    const route = type === 'PACK' ? CREATE_PACK_EVENT : CREATE_ITEM_EVENT;
    API.apiPOST(route.replace('{id}', encodeURIComponent(itemID)), data).then(
      (resp) => {
        if (resp.has_error) {
          console.log(resp.error.response.data);
        } else {
          console.log(resp.response.data);
          alert('Evento cadastrado com sucesso!');
          if (onChange) {
            onChange();
          }
        }
        setIsLoading(false);
      }
    );
    return 1;
  };

  useEffect(() => {
    API.apiGET(LIST_TIMELINE).then((resp) => {
      if (resp.has_error) {
        alert(resp.error);
      } else {
        setTimeline(resp.response.data.data);
      }
    });
  }, []);

  const getCorrectSubView = () => {
    switch (tabActual) {
      case 'owner':
        return (
          <>
            <Form.Group as={Col} md="4" controlId="validationFormik102">
              <Form.Label>ID do novo proprietário</Form.Label>
              <Form.Control
                type="text"
                name="owner"
                value={values.owner}
                onChange={handleChange}
                isValid={values.owner && !errors.owner}
              />
            </Form.Group>
          </>
        );

      case 'holder':
        return (
          <>
            <Form.Group as={Col} md="4" controlId="validationFormik102">
              <Form.Label>ID do novo guardador</Form.Label>
              <Form.Control
                type="text"
                name="holder_id"
                value={values.holder_id}
                onChange={handleChange}
                isValid={values.holder_id && !errors.holder_id}
              />
            </Form.Group>
          </>
        );

      case 'location':
        // "latitude": 0,
        //     "longitude": 0,
        //     "timelineId": "string",
        //     "code": "string",
        //     "information": "string"
        return (
          <>
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="validationFormik102">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="number"
                  name="latitude"
                  value={values.latitude}
                  onChange={handleChange}
                  isValid={values.latitude && !errors.latitude}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik102">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="number"
                  name="longitude"
                  value={values.longitude}
                  onChange={handleChange}
                  isValid={values.longitude && !errors.longitude}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="10" controlId="validationFormik102">
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
          </>
        );

      case 'alarm':
        // "latitude": 0,
        //     "longitude": 0,
        //     "timelineId": "string",
        //     "code": "string",
        //     "information": "string"
        return (
          <>
            <Form.Row>
              <Form.Group as={Col} md="10" controlId="validationFormik102">
                <Form.Label>O que fazer?</Form.Label>
                <Form.Control
                  type="text"
                  name="whattodo"
                  value={values.whattodo}
                  onChange={handleChange}
                  isValid={values.whattodo && !errors.whattodo}
                />
              </Form.Group>
              <Form.Group as={Col} md="10" controlId="validationFormik102">
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
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Nav fill variant="tabs" defaultActiveKey="1">
        <Nav.Item onClick={() => setTabActual('owner')}>
          <Nav.Link eventKey="1">Mudança proprietário</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => setTabActual('holder')}>
          <Nav.Link eventKey="2">Mudança guardador</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => setTabActual('location')}>
          <Nav.Link eventKey="3">Nova localização</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => setTabActual('alarm')}>
          <Nav.Link eventKey="4">Novo alarme</Nav.Link>
        </Nav.Item>
      </Nav>
      <br />
      {getCorrectSubView()}

      <Button onClick={isLoading ? null : handleSubmit} disabled={isLoading}>
        {isLoading ? 'Um momento…' : 'Adicionar evento'}
      </Button>
    </div>
  );
};
