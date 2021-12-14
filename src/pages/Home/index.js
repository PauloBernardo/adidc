import React, { useRef, useState } from 'react';
import QrReader from 'react-qr-reader';
import { Button, Row } from 'react-bootstrap';
import { FaBox, FaBoxes, GoGift, RiPieChartBoxLine } from 'react-icons/all';
import * as API from '../../services/api';
import { GET_PRODUCT } from '../../services/routes';
import { AddEvent } from '../../components/AddEvent';
import qrCode from '../../qrCode.png';

export const Home = () => {
  const [option, setOption] = useState();
  const [result, setResult] = useState();
  const [qrCodeData, setQrCodeData] = useState();
  const qrCodeRef = useRef();

  const getQRCodeData = (id) => {
    API.apiGET(GET_PRODUCT.replace('{id}', encodeURIComponent(id))).then(
      (resp) => {
        console.log(resp);
        if (resp.has_error) {
          alert(resp.error);
        } else {
          setQrCodeData(resp.response.data);
        }
      }
    );
  };

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      getQRCodeData(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const openImageDialog = () => {
    qrCodeRef.current.openImageDialog();
  };

  const qrCodeView = () => {
    if (option) {
      if (option === 'video') {
        return (
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: 400, height: 400, margin: 'auto' }}
          />
        );
      }
      if (option === 'image') {
        return (
          <>
            <Row
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <QrReader
                ref={qrCodeRef}
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: 200, height: 200, margin: 'auto' }}
                legacyMode
              />
              <Button
                className="center m-1"
                style={{ margin: 'auto', maxHeight: 40 }}
                onClick={openImageDialog}
              >
                Ler um QR Code
              </Button>
            </Row>
          </>
        );
      }
    }
    return (
      <p style={{ textAlign: 'center' }}>Selecione uma das opções acima</p>
    );
  };

  return (
    <>
      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">Regristros do sistema</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <FaBoxes size="3em" color="#3d5959" />
            <h2>Produtos</h2>
            <p>
              A entidade ‘product’ representa um produto que está vinculado a
              uma empresa.
            </p>
            <a href="#listProducts" className="icon-link">
              Lista de produtos
              <svg className="bi" width="1em" height="1em">
                {/* <use xlink:href="#chevron-right" /> */}
              </svg>
            </a>
          </div>
          <div className="feature col">
            <FaBox size="3em" color="#3d5959" />
            <h2>Pacotes</h2>
            <p>
              A entidade ‘pack’ representa um pacote que pode ou não englobar
              diversos itens de produto e outros pacotes. Exemplo: um caminhão
              pode ser descrito como um ‘pack’, englobando diversos
              produtos(TVs, celulares, ect) e outros pacotes(lotes de produtos
              alimentícios como leite).
            </p>
            <a href="#listPackets" className="icon-link">
              Lista de pacotes
              <svg className="bi" width="1em" height="1em">
                {/* <use xlink:href="#chevron-right" /> */}
              </svg>
            </a>
          </div>
          <div className="feature col">
            <RiPieChartBoxLine size="3em" color="#3d5959" />
            <h2>Timeline</h2>
            <p>
              A entidade ‘timeline’ representa uma linha do tempo de itens de
              produtos e pacotes. Serve para monitoramento dos eventos ocorridos
              entre as entidades presentes no sistema.
            </p>
            <a href="#timeline" className="icon-link">
              Lista de timelines
              <svg className="bi" width="1em" height="1em">
                {/* <use xlink:href="#chevron-right" /> */}
              </svg>
            </a>
          </div>
          <div className="feature col">
            <GoGift size="3em" color="#3d5959" />
            <h2>Promoções</h2>
            <p>
              A entidade ‘promotion’ representa uma promoção que pode ser criada
              e ligada a diversos produtos participantes.
            </p>
            <a href="#listPromotion" className="icon-link">
              Lista de promoções
              <svg className="bi" width="1em" height="1em">
                {/* <use xlink:href="#chevron-right" /> */}
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={qrCode}
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Leitura de QRCodes</h1>
            <p className="lead">
              Você pode ler QRCodes com a câmera e rapidamente ter todos os
              dados do seu pacote, produtos e/ou itens! Além disso, o sistema
              permite o cadastro rápido e fácil dos eventos nestes items e
              pacotes. Experimente agora.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 me-md-2"
                onClick={() => setOption('video')}
              >
                Via Video
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4 ml-1"
                onClick={() => setOption('image')}
              >
                Via Imagem
              </button>
            </div>
            <hr />
            {qrCodeView()}
            {!qrCodeData ? (
              <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Resultado: Nenhum resultado encontrado..
              </p>
            ) : (
              <>
                <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  Resultado: {result || 'Nenhum resultado encontrado..'}
                </p>
                <p>
                  <b>ID:</b> {qrCodeData?.id}
                </p>
                <p>
                  <b>Nome:</b> {qrCodeData?.name}
                </p>
                <p>
                  <b>Descrição:</b> {qrCodeData?.description}
                </p>
                <p>
                  <b>Categoria:</b> {qrCodeData?.category}
                </p>
                <p>
                  <b>Tipo:</b> {qrCodeData?.type}
                </p>
              </>
            )}
            {qrCodeData?.type === 'PRODUCT_ITEM' && (
              <>
                <hr />
                <h4>Adicionar eventos ao item</h4>
                <AddEvent itemID={qrCodeData?.id} />
              </>
            )}
            {qrCodeData?.type === 'PACK' && (
              <>
                <hr />
                <h4>Adicionar eventos ao pacote</h4>
                <AddEvent type={qrCodeData?.type} itemID={qrCodeData?.id} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
