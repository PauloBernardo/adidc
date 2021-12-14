import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../../../services/api';
import { GET_PROMOTION } from '../../../services/routes';
import { Container } from './styles';
import { ViewDefault } from '../../../components/ViewDefault';
import { setAppValue } from '../../../redux/actions/app';

export const PromotionView = () => {
  const [promotion, setPromotion] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const promotionID = useSelector((state) => state.app.promotion_id);

  useEffect(() => {
    console.log(history);
    API.apiGET(
      GET_PROMOTION.replace('{id}', encodeURIComponent(promotionID))
    ).then((resp) => {
      if (resp.has_error) {
        alert(resp.error);
        console.log(resp.error.response);
      } else {
        console.log(resp.response.data);
        setPromotion({ ...resp.response.data, ...resp.response.data.data });
      }
    });
  }, []);

  return (
    <Container>
      <h1>Visualizar Promoção</h1>
      <ViewDefault
        object={promotion}
        values={[
          { label: 'ID', key: 'id' },
          { label: 'Título', key: 'title' },
          { label: 'Nome', key: 'name' },
          { label: 'Descrição', key: 'description' },
          { label: 'Status', key: 'status' },
          {
            label: 'Produtos cadastrados',
            key: 'products',
            type: 'texts',
            clickable: true,
            onClick: (text) => {
              dispatch(setAppValue({ product_id: text }));
              history.push({
                pathname: 'productView',
                state: { id: text },
              });
            },
          },
          { label: 'Imagem', key: 'image', type: 'image' },
          { label: 'Disponivel', key: 'enabled', type: 'bool' },
          { label: 'Prêmios', key: 'prizes' },
          { label: 'Requisições', key: 'requirements' },
        ]}
      />
    </Container>
  );
};
