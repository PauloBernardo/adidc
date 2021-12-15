import React, { useEffect, useState } from 'react';
import { Alert, Button, Pagination, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { FaPlus } from 'react-icons/fa';
import { VscLoading } from 'react-icons/all';

import { useSelector } from 'react-redux';
import * as API from '../../services/api';
import {
  ButtonContainer,
  Container,
  Header,
  Select,
  TD,
  TDRow,
  TH,
  Title,
} from './styles';
import { SearchContainer, SearchIcon, SearchText } from '../Header/styles';

const FilterIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z"
        fill="#CBD5E0"
      />
    </svg>
  );
};

export const TableList = ({
  title,
  buttonAddLabel,
  getUrl,
  deleteUrl,
  onAdd,
  fields,
  onViewAction,
}) => {
  const token = useSelector((state) => state.user.user.token);
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState({ pageActual: 0, nextPage: 1 });
  const [items, setItems] = useState([]);
  const history = useHistory();
  const [error, setError] = useState();

  const getProductItems = () => {
    setLoading(true);
    API.apiGET(
      getUrl,
      {
        page: pageData.pageActual,
      },
      token
    )
      .then((resp) => {
        // console.log(resp);
        if (resp.has_error) {
          setError(
            `${resp.error.message} - ${resp.error.response?.data?.error?.message}`
          );
        } else {
          // console.log(resp.data);
          setItems(resp.data);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getProductItems();
  }, [pageData.pageActual]);

  const deleteProductItem = (itemId) => {
    alert('Não implementado ainda');
    // API.apiDELETE(deleteUrl.replace('{id}', encodeURIComponent(itemId)))
    //   .then((response) => {
    //     if (!response.has_error && response.response.status === 200) {
    //       getProductItems();
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  const getPagination = () => {
    if (pageData.pageActual !== 0) {
      if (pageData.pageActual > 1) {
        return (
          <>
            <Pagination.Prev
              onClick={() =>
                setPageData({
                  pageActual: pageData.pageActual - 1,
                  nextPage: pageData.pageActual,
                })
              }
            />
            <Pagination.Item
              onClick={() =>
                setPageData({
                  pageActual: 0,
                  nextPage: 1,
                })
              }
            >
              {1}
            </Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item
              onClick={() =>
                setPageData({
                  pageActual: pageData.pageActual - 1,
                  nextPage: pageData.pageActual,
                })
              }
            >
              {pageData.pageActual}
            </Pagination.Item>
          </>
        );
      }
      return (
        <>
          <Pagination.Prev
            onClick={() =>
              setPageData({
                pageActual: 0,
                nextPage: 1,
              })
            }
          />
          <Pagination.Item
            onClick={() =>
              setPageData({
                pageActual: pageData.pageActual - 1,
                nextPage: pageData.pageActual,
              })
            }
          >
            {1}
          </Pagination.Item>
        </>
      );
    }
    return null;
  };

  const renderField = (field, object) => {
    let objAux;
    switch (field.type) {
      case 'image':
        return (
          <TD>
            <img
              width={50}
              height={50}
              src={object[field.id]}
              alt={field.label}
            />{' '}
          </TD>
        );
      case 'link':
        return (
          <TD>
            <a target="blank" href={object[field.key]}>
              {object[field.id]}
            </a>{' '}
          </TD>
        );
      case 'time':
        return (
          <TD>
            {`${new Date(object[field.id]).toLocaleDateString()} ${new Date(
              object[field.id]
            ).toLocaleTimeString()}`}
          </TD>
        );
      case 'texts':
        // console.log(field.key);
        objAux = '';
        (object[field.id] || []).forEach((text, idx) => {
          objAux += objAux === '' ? text : `, ${text}`;
        });
        return (
          <TD
            clickable={field.clickable}
            onClick={field.clickable ? () => field.onClick(objAux) : undefined}
            key={objAux}
          >
            {objAux}
          </TD>
        );
      case 'object':
        // console.log(field.key);
        objAux = object;
        field.object_keys.forEach((k) => {
          objAux = objAux[k];
        });
        return (
          <TD
            clickable={field.clickable}
            onClick={
              field.clickable
                ? () => field.onClick(object[field.id])
                : undefined
            }
            key={objAux}
          >
            {JSON.stringify(objAux)}
          </TD>
        );
      case 'objects':
        // console.log(field.key);
        objAux = '';
        object[field.id].forEach((k) => {
          objAux +=
            objAux === '' ? k[field.object_key] : `, ${k[field.object_key]}`;
        });
        return (
          <TD
            clickable={field.clickable}
            onClick={field.clickable ? () => field.onClick(objAux) : undefined}
            key={objAux}
          >
            {JSON.stringify(objAux)}
          </TD>
        );
      case 'links':
        return (object[field.key] || []).map((link, idx) => {
          return (
            <TD key={link}>
              <a target="blank" href={link}>
                {link}
              </a>{' '}
            </TD>
          );
        });
      case 'bool':
        return <TD>{object[field.id] ? 'Sim' : 'Não'}</TD>;
      default:
        return <TD>{JSON.stringify(object[field.id])}</TD>;
    }
  };

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Select>
          <option>Selecionar Coluna</option>
        </Select>
        <SearchContainer style={{ margin: 10 }}>
          <SearchIcon />
          <SearchText> Pesquisar... </SearchText>
        </SearchContainer>
        <FilterIcon />
      </Header>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading && (
        <Alert variant="info">
          Carregando... <VscLoading />
        </Alert>
      )}
      {onAdd && buttonAddLabel && (
        <ButtonContainer>
          <Button variant="secondary" onClick={onAdd}>
            <FaPlus style={{ marginBottom: 3 }} /> {buttonAddLabel}
          </Button>
        </ButtonContainer>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            {fields.map((field) => {
              return <TH>{field.label}</TH>;
            })}
            <TH>Ações</TH>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr>
                {fields.map((field) => {
                  return renderField(field, item);
                  // return <TD>{item[field.id]}</TD>;
                })}
                <TD>
                  <TDRow>
                    <div
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        if (onViewAction) onViewAction(item);
                      }}
                    >
                      Visualizar
                    </div>
                    <div
                      onClick={() => deleteProductItem(item.id)}
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      Deletar
                    </div>
                  </TDRow>
                </TD>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First
          onClick={() => setPageData({ pageActual: 0, nextPage: 1 })}
        />
        {getPagination()}
        <Pagination.Item active>{pageData.pageActual + 1}</Pagination.Item>
        <Pagination.Item
          disabled={items.length === 0}
          onClick={() =>
            setPageData({
              pageActual: pageData.nextPage,
              nextPage: pageData.nextPage + 1,
            })
          }
        >
          {pageData.nextPage + 1}
        </Pagination.Item>
        <Pagination.Next
          disabled={items.length === 0}
          onClick={() =>
            setPageData({
              pageActual: pageData.pageActual + 1,
              nextPage: pageData.pageActual + 2,
            })
          }
        />
      </Pagination>
    </Container>
  );
};
