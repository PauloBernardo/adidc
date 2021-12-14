import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import * as API from '../../../services/api';
import { DELETE_PROMOTION, LIST_PROMOTION } from '../../../services/routes';
import { Container } from './styles';
import { ButtonContainer } from '../../products/AddProducts/styles';
import { setAppValue } from '../../../redux/actions/app';

export const ListPromotion = () => {
  const user = useSelector((state) => state.user);
  const [promotions, setPromotions] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const getPromotions = () => {
    API.apiGET(LIST_PROMOTION).then((resp) => {
      console.log(resp);
      if (resp.has_error) {
        console.log(resp.error.response);
        alert(resp.error);
      } else {
        setPromotions(resp.response.data.data);
      }
    });
  };

  useEffect(() => {
    console.log(user);
    getPromotions();
  }, []);

  const deletePromotion = (id) => {
    API.apiDELETE(DELETE_PROMOTION.replace('{id}', encodeURIComponent(id)))
      .then((response) => {
        if (!response.has_error && response.response.status === 200) {
          getPromotions();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <h1>Lista de Promoção</h1>
      <ButtonContainer>
        <Button
          variant="secondary"
          onClick={() => history.push('addPromotions')}
        >
          <FaPlus style={{ marginBottom: 3 }} /> Adicionar Promoção
        </Button>
      </ButtonContainer>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Promoção</th>
            <th>Visualizar</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((promotion, idx) => {
            return (
              <tr>
                <td>{idx}</td>
                <td>{promotion.title}</td>
                <td>{promotion.status}</td>
                <td
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    dispatch(setAppValue({ promotion_id: promotion.id }));
                    history.push({
                      pathname: 'promotionView',
                      state: { id: promotion.id },
                    });
                  }}
                >
                  <FaEye />
                </td>
                <td
                  onClick={() =>
                    history.push({
                      pathname: 'editPromotion',
                      state: { detail: promotion },
                    })
                  }
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <FaEdit />
                </td>
                <td
                  onClick={() => deletePromotion(promotion.id, idx)}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <FaTrash />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};
