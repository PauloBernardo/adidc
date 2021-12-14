import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

export const About = () => {
  const logged = useSelector((state) => state.user.logged);
  const history = useHistory();

  return (
    <div className="bg-dark text-secondary px-4 py-5 text-center">
      <div className="py-5">
        <h1 className="display-5 fw-bold text-white">
          TRACKID
          <br />
          Sistema de controle empresarial
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="fs-5 mb-4">
            O sistema TrackID é composto por várias APIs de integração e por um
            aplicativo voltado ao cliente final. As empresas que contratarem o
            sistema TrackID se comunicarão com a ferramenta através da API
            Empresa Cliente. Esse canal possui uma série de endpoints que
            permitirão com que a empresa faça a gestão de seus produtos, pessoal
            e eventos que podem ocorrer com os produtos cadastrados. O sistema
            também permitirá que clientes finais possam realizar a verificação
            de informações de produtos ou promoções através de um aplicativo.
            Esse aplicativo irá se comunicar com o sistema através da API
            Aplicativo Cliente Final.
          </p>
          {!logged && (
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button
                onClick={() =>
                  history.push({
                    pathname: 'login',
                  })
                }
                type="button"
                className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold"
              >
                Realizar Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
