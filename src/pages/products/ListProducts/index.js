import React, { useEffect, useState } from 'react';
import { Alert, Button, Modal, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import {
  FaDownload,
  FaEye,
  FaList,
  FaPlus,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';
import QRCode from 'react-qr-code';
import { useDispatch } from 'react-redux';
import { VscLoading } from 'react-icons/all';
import { setAppValue } from '../../../redux/actions/app';
import { ButtonContainer, Container } from '../AddProducts/styles';
import {
  LIST_PRODUCT,
  READ_PRODUCT_QRCODE,
  DELETE_PRODUCT,
} from '../../../services/routes';
import * as API from '../../../services/api';

export const ListProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [qrCode, setQrCode] = useState('');
  const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const getProducts = () => {
    setLoading(true);
    API.apiGET(LIST_PRODUCT)
      .then((resp) => {
        console.log(resp);
        if (resp.has_error) {
          alert(resp.error);
        } else {
          setProducts(resp.response.data);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const downloadQRCode = (id) => {
    API.apiGET(
      READ_PRODUCT_QRCODE.replace('{id}', encodeURIComponent(id))
    ).then((resp) => {
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
    });
  };

  const deleteProduct = (id) => {
    API.apiDELETE(DELETE_PRODUCT.replace('{id}', encodeURIComponent(id)))
      .then((response) => {
        if (!response.has_error && response.response.status === 200) {
          getProducts();
        }
      })
      .catch((err) => console.log(err));
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

  return (
    <Container>
      <h1>Lista de Produtos</h1>
      {loading && (
        <Alert variant="info">
          Carregando... <VscLoading />
        </Alert>
      )}
      <ButtonContainer>
        <Button variant="secondary" onClick={() => history.push('addProducts')}>
          <FaPlus style={{ marginBottom: 3 }} /> Adicionar Produto
        </Button>
      </ButtonContainer>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Visualizar</th>
            <th>Items</th>
            <th>QRCODE</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => {
            return (
              <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    dispatch(setAppValue({ product_id: product.id }));
                    history.push({
                      pathname: 'productView',
                      state: { id: product.id },
                    });
                  }}
                >
                  <FaEye />
                </td>
                <td
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    dispatch(setAppValue({ product_id: product.id }));
                    history.push({
                      pathname: 'listProductItems',
                      state: { id: product.id },
                    });
                  }}
                >
                  <FaList />
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
                  onClick={() =>
                    history.push({
                      pathname: 'editProductItem',
                      state: { detail: product },
                    })
                  }
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <FaEdit />
                </td>
                <td
                  onClick={() => deleteProduct(product.id, idx)}
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
