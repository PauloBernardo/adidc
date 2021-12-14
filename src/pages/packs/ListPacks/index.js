import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { FaDownload, FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import { Container } from './styles';
import {
  DELETE_PACK,
  LIST_PACK,
  READ_PACK_QRCODE,
} from '../../../services/routes';
import * as API from '../../../services/api';
import { ButtonContainer } from '../../products/AddProducts/styles';
import { setAppValue } from '../../../redux/actions/app';

export const ListPacks = () => {
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [qrCode, setQrCode] = useState('');
  const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const getPack = () => {
    API.apiGET(LIST_PACK, {
      id: user.logged ? encodeURIComponent(user.user['custom:company_id']) : '',
    }).then((resp) => {
      console.log(resp);
      if (resp.has_error) {
        console.log(resp.error.response);
        alert(resp.error);
      } else {
        setProducts(resp.response.data.data);
      }
    });
  };

  useEffect(() => {
    console.log(user);
    getPack();
  }, []);

  const downloadQRCode = (id) => {
    API.apiGET(READ_PACK_QRCODE.replace('{id}', encodeURIComponent(id))).then(
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

  const deleteProduct = (id) => {
    API.apiDELETE(DELETE_PACK.replace('{id}', encodeURIComponent(id)))
      .then((response) => {
        if (!response.has_error && response.response.status === 200) {
          getPack();
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
      <h1>Lista de Pacotes</h1>
      <ButtonContainer>
        <Button variant="secondary" onClick={() => history.push('addProducts')}>
          <FaPlus style={{ marginBottom: 3 }} /> Adicionar Pacote
        </Button>
      </ButtonContainer>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Visualizar</th>
            <th>QRCODE</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => {
            return (
              <tr>
                <td>{idx}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    dispatch(setAppValue({ pack_id: product.id }));
                    history.push({
                      pathname: 'packView',
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
