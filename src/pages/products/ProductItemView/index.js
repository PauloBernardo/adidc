import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { FaDownload } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import { useSelector } from 'react-redux';
import * as API from '../../../services/api';
import { GET_ITEM, READ_ITEM_QRCODE } from '../../../services/routes';
import { Container } from './styles';
import { ViewDefault } from '../../../components/ViewDefault';
import { AddEvent } from '../../../components/AddEvent';
import { EventsList } from '../../../components/EventsList';

export const ProductItemView = () => {
  const [product, setProduct] = useState({});
  const [lastUpdate, setLastUpdate] = useState(new Date().getTime());
  const history = useHistory();
  const [qrCode, setQrCode] = useState('');
  const [show, setShow] = useState(false);
  const productID = useSelector((state) => state.app.item_id);

  const getItem = () => {
    API.apiGET(GET_ITEM.replace('{id}', encodeURIComponent(productID))).then(
      (resp) => {
        console.log(resp);
        if (resp.has_error) {
          alert(resp.error);
        } else {
          // console.log(resp.response.data);
          setProduct(resp.response.data);
        }
      }
    );
  };

  useEffect(() => {
    console.log(history);
    getItem();
  }, []);

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

  return (
    <Container>
      <h1>Visualizar Item de Produto</h1>
      <ViewDefault
        object={product}
        values={[
          { label: 'ID', key: 'id' },
          { label: 'Proprietário', key: 'owner' },
          { label: 'Guardador', key: 'holder' },
          { label: 'Nome', key: 'name' },
          { label: 'Categoria', key: 'category' },
          { label: 'Lote', key: 'lot', type: 'text' },
        ]}
      />
      <Form.Group
        onClick={() => downloadQRCode(product.id)}
        style={{
          cursor: 'pointer',
        }}
      >
        <Form.Label>QRCode</Form.Label>
        <FaDownload />
      </Form.Group>

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
      <hr />
      <h4>Adicionar eventos ao item</h4>
      <AddEvent
        itemID={product?.id}
        onChange={() => {
          setLastUpdate(new Date().getTime());
          getItem();
        }}
      />
      <hr />
      <EventsList type="ITEM" id={productID} lastUpdate={lastUpdate} />
    </Container>
  );
};
