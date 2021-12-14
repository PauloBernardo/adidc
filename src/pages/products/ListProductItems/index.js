import React, { useEffect, useState } from 'react';
import { Alert, Button, Modal, Pagination, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { FaDownload, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import { useDispatch, useSelector } from 'react-redux';
import { VscLoading } from 'react-icons/all';
import * as API from '../../../services/api';
import {
  DEACTIVATE_ITEM,
  LIST_ITEM,
  READ_ITEM_QRCODE,
} from '../../../services/routes';
import { Container } from './styles';
import { ButtonContainer } from '../AddProducts/styles';
import { setAppValue } from '../../../redux/actions/app';

export const ListProductItems = () => {
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState({ pageActual: 0, nextPage: 1 });
  const productId = useSelector((state) => state.app.product_id);
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const [qrCode, setQrCode] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const getProductItems = () => {
    setLoading(true);
    API.apiGET(LIST_ITEM.replace('{id}', encodeURIComponent(productId)), {
      page: pageData.pageActual,
    })
      .then((resp) => {
        // console.log(resp);
        if (resp.has_error) {
          setError(
            `${resp.error.message} - ${resp.error.response?.data?.error?.message}`
          );
        } else {
          // console.log(resp.response.data);
          setProducts(resp.response.data.data);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    console.log(history);
    getProductItems();
  }, [pageData.pageActual]);

  const downloadQRCode = (id) => {
    API.apiGET(READ_ITEM_QRCODE.replace('{id}', encodeURIComponent(id))).then(
      (resp) => {
        console.log(resp);
        if (resp.has_error) {
          console.log(resp.error);
          // alert(resp.error);
          setShow(true);
          setQrCode(id);
        } else {
          // console.log(resp.response.data);
          const a = document.createElement('a'); // Create <a>
          a.href = `data:image/png;base64,${resp.response.data}`; // Image Base64 Goes here
          a.download = 'Image.png'; // File name Here
          a.click(); // Downloaded file
          // setProducts(resp.response.data);
        }
      }
    );
  };

  const downloadQRCodeFake = () => {
    // Cria um elemento <a> e define o href a ele
    const img = document.querySelector('.modal-body svg');
    console.log(img);
    const svgBlob = new Blob([img.outerHTML], {
      type: 'image/svg+xml;charset=utf-8',
    });
    console.log(svgBlob);
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'qrCode.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleClose = () => {
    setShow(false);
    setQrCode('');
  };

  const deleteProductItem = (itemId) => {
    API.apiDELETE(DEACTIVATE_ITEM.replace('{id}', encodeURIComponent(itemId)))
      .then((response) => {
        if (!response.has_error && response.response.status === 200) {
          getProductItems();
        }
      })
      .catch((err) => console.log(err));
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

  return (
    <Container>
      <h1>Lista de Item de Produto</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading && (
        <Alert variant="info">
          Carregando... <VscLoading />
        </Alert>
      )}
      <ButtonContainer>
        <Button
          variant="secondary"
          onClick={() =>
            history.push({
              pathname: 'addProductItem',
              state: { id: history.location.state?.id },
            })
          }
        >
          <FaPlus style={{ marginBottom: 3 }} /> Adicionar Item
        </Button>
      </ButtonContainer>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Lote</th>
            <th>Visualizar</th>
            <th>QRCode</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.lot}</td>
                <td
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    dispatch(setAppValue({ item_id: product.id }));
                    history.push({
                      pathname: 'productItemView',
                      state: { id: product.id },
                    });
                  }}
                >
                  <FaEye />
                </td>
                <td
                  onClick={() => downloadQRCode(product.id)}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <FaDownload />
                </td>
                <td
                  onClick={() => deleteProductItem(product.id)}
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
      <Pagination>
        <Pagination.First
          onClick={() => setPageData({ pageActual: 0, nextPage: 1 })}
        />
        {getPagination()}
        <Pagination.Item active>{pageData.pageActual + 1}</Pagination.Item>
        <Pagination.Item
          disabled={products.length === 0}
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
          disabled={products.length === 0}
          onClick={() =>
            setPageData({
              pageActual: pageData.pageActual + 1,
              nextPage: pageData.pageActual + 2,
            })
          }
        />
      </Pagination>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>QRCODE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QRCode value={qrCode} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={downloadQRCodeFake}>
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
