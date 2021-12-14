import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Nav } from 'react-bootstrap';
import * as API from '../../services/api';
import {
  ADD_ITEM_PACK,
  LIST_ITEM,
  LIST_PACK,
  LIST_PRODUCT,
} from '../../services/routes';

export const AddItemPack = ({ packID, oldItems, onChange }) => {
  const [tabActual, setTabActual] = useState('pack');
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [packs, setPacks] = useState([]);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    let data = {};
    switch (tabActual) {
      case 'item':
        data = { items: oldItems.concat([values.itemId]) };
        break;
      case 'pack':
        data = { items: oldItems.concat([values.packId]) };
        break;
      default:
        return null;
    }
    console.log(data);
    setIsLoading(true);

    API.apiPUT(
      ADD_ITEM_PACK.replace('{id}', encodeURIComponent(packID)),
      data
    ).then((resp) => {
      if (resp.has_error) {
        console.log(resp.error);
      } else {
        console.log(resp.response.data);
        alert('Item adicionado com sucesso!');
        onChange();
      }
      setIsLoading(false);
    });
    return 1;
  };

  useEffect(() => {
    API.apiGET(LIST_PACK).then((resp) => {
      if (resp.has_error) {
        alert(resp.error);
      } else {
        setPacks(resp.response.data.data);
      }
    });
    API.apiGET(LIST_PRODUCT).then((resp) => {
      if (resp.has_error) {
        alert(resp.error);
      } else {
        setProducts(resp.response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (values.productId)
      API.apiGET(
        LIST_ITEM.replace('{id}', encodeURIComponent(values.productId))
      ).then((resp) => {
        if (resp.has_error) {
          alert(resp.error);
        } else {
          setItems(resp.response.data.data);
        }
      });
  }, [values.productId]);

  const getCorrectSubView = () => {
    switch (tabActual) {
      case 'pack':
        return (
          <>
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="validationFormik102">
                <Form.Label>Pacote</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  name="packId"
                  value={values.packId}
                  onChange={handleChange}
                  isValid={values.packId && !errors.packId}
                >
                  {packs.map((t) => {
                    return <option value={t.id}>{t.name}</option>;
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </>
        );

      case 'item':
        return (
          <>
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="validationFormik102">
                <Form.Label>Produto</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  name="productId"
                  value={values.productId}
                  onChange={handleChange}
                  isValid={values.productId && !errors.productId}
                >
                  {products.map((t) => {
                    return <option value={t.id}>{t.name}</option>;
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik102">
                <Form.Label>Item</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  name="itemId"
                  value={values.itemId}
                  onChange={handleChange}
                  isValid={values.itemId && !errors.itemId}
                >
                  {items.map((e) => {
                    return (
                      <option value={e.id}>
                        {e.name} + {e.lot} + {e.id}
                      </option>
                    );
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
        <Nav.Item onClick={() => setTabActual('pack')}>
          <Nav.Link eventKey="1">Pacote</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => setTabActual('item')}>
          <Nav.Link eventKey="2">Item de produto</Nav.Link>
        </Nav.Item>
      </Nav>
      <br />
      {getCorrectSubView()}

      <Button onClick={isLoading ? null : handleSubmit} disabled={isLoading}>
        {isLoading ? 'Um momento…' : 'Adicionar item'}
      </Button>
    </div>
  );
};
