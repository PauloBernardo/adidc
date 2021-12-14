import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { FaDownload } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import * as API from '../../../services/api';
import { GET_PRODUCT, READ_PRODUCT_QRCODE } from '../../../services/routes';
import { Container } from './styles';
import { ViewDefault } from '../../../components/ViewDefault';
import { ListProductItems } from '../ListProductItems';

export const ProductView = () => {
  const [product, setProduct] = useState({});
  const history = useHistory();
  const [qrCode, setQrCode] = useState('');
  const [show, setShow] = useState(false);
  const productID = history.location.state?.id;

  useEffect(() => {
    console.log(history);
    API.apiGET(GET_PRODUCT.replace('{id}', encodeURIComponent(productID))).then(
      (resp) => {
        if (resp.has_error) {
          alert(resp.error);
          console.log(resp.error.response);
        } else {
          // console.log(resp.response.data);
          setProduct(resp.response.data);
        }
      }
    );
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
        const a = document.createElement('a'); // Create <a>
        a.href = `data:image/png;base64,${resp.response.data}`; // Image Base64 Goes here
        a.download = 'Image.png'; // File name Here
        a.click(); // Downloaded file
        // setProducts(resp.response.data);
      }
    });
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
      <h1>Visualizar Produto</h1>
      <ViewDefault
        object={product}
        values={[
          { label: 'ID', key: 'id' },
          { label: 'Nome', key: 'name' },
          { label: 'Categoria', key: 'category' },
          { label: 'Imagem', key: 'image', type: 'image' },
          { label: 'Manual', key: 'manual', type: 'link' },
          { label: 'Vídeos', key: 'videos', type: 'links' },
          { label: 'Preoucações', key: 'precautions', type: 'texts' },
          { label: 'Conteudos', key: 'contents' },
        ]}
      />
      <Form.Group
        onClick={() => downloadQRCode(product.id)}
        style={{
          cursor: 'pointer',
        }}
      >
        <Form.Label>QRCode</Form.Label>
        <Form.Text>
          <FaDownload />
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Items</Form.Label>
        <ListProductItems />
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
    </Container>
  );
};
