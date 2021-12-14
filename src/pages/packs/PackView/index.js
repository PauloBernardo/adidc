import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { FaDownload } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../../../services/api';
import { GET_PACK, READ_PACK_QRCODE } from '../../../services/routes';
import { Container } from './styles';
import { ViewDefault } from '../../../components/ViewDefault';
import { AddItemPack } from '../../../components/AddItemPack';
import { AddEvent } from '../../../components/AddEvent';
import { EventsList } from '../../../components/EventsList';
import { setAppValue } from '../../../redux/actions/app';

export const PackView = () => {
  const [pack, setPack] = useState({});
  const [lastUpdate, setLastUpdate] = useState(new Date().getTime());
  const history = useHistory();
  const [qrCode, setQrCode] = useState('');
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const packID = useSelector((state) => state.app.pack_id);

  const getPack = () => {
    API.apiGET(GET_PACK.replace('{id}', encodeURIComponent(packID))).then(
      (resp) => {
        if (resp.has_error) {
          alert(resp.error);
          console.log(resp.error.response);
        } else {
          // console.log(resp.response.data);
          setPack(resp.response.data);
        }
      }
    );
  };

  useEffect(() => {
    console.log(history);
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
      <h1>Visualizar Pack</h1>
      <ViewDefault
        object={pack}
        values={[
          { label: 'ID', key: 'id' },
          { label: 'Nome', key: 'name' },
          { label: 'Proprietário', key: 'owner' },
          { label: 'Guardador', key: 'holder' },
          { label: 'Categoria', key: 'category' },
          { label: 'Imagem', key: 'image', type: 'image' },
          { label: 'Manual', key: 'manual', type: 'link' },
          { label: 'Vídeos', key: 'videos', type: 'links' },
          { label: 'Preoucações', key: 'precautions', type: 'texts' },
          { label: 'Conteudos', key: 'contents' },
          {
            label: 'Itens',
            key: 'items',
            type: 'objects',
            object_keys: ['id'],
            clickable: true,
            onCLick: (value) => {
              dispatch(setAppValue({ item_id: value.id }));
              history.push({
                pathname: 'productItemView',
                state: { id: value.id },
              });
            },
          },
        ]}
      />
      <Form.Group
        onClick={() => downloadQRCode(pack.id)}
        style={{
          cursor: 'pointer',
        }}
      >
        <Form.Label>QRCode</Form.Label>
        <Form.Text>
          <FaDownload />
        </Form.Text>
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
      <h2>Adicionar items ao pacote</h2>
      <AddItemPack packID={packID} oldItems={pack.items} onChange={getPack} />

      <hr />
      <h2>Adicionar eventos ao pacote</h2>
      <AddEvent
        type="PACK"
        itemID={packID}
        onChange={() => {
          setLastUpdate(new Date().getTime());
          getPack();
        }}
      />

      <EventsList type="PACK" id={packID} lastUpdate={lastUpdate} />
    </Container>
  );
};
