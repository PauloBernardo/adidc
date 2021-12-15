import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';

export const About = () => {
  const logged = useSelector((state) => state.user.logged);
  const history = useHistory();

  return (
    <>
      <Header title="Sobre - Visão Geral" />
      <div className="bg-white text-secondary px-4 py-5 text-center">
        <div className="py-5">
          <h1 className="display-5 fw-bold text-black-50">
            ADIDC
            <br />
            Análise de imagens distribuída e concorrente
          </h1>
          <div className="col-lg-6 mx-auto">
            <p className="fs-5 mb-4">
              O projeto consistiu no desenvolvimento de uma aplicação para
              leitura e análise de dados capturados por meio de câmeras a fim de
              gerar alertas. A análise dos dados foi feita de forma distribuída
              e concorrente. Os dados analisados geraram alertas que foram
              armazenados em um banco de dados. Estes alertas poderiam ser
              visualizados pelo cliente final por meio de uma aplicação web.
              Para o desenvolvimento, foram feitas várias pesquisas e utilizadas
              tecnologias conhecidas, como Python, PostgreSQL e Reactjs. O
              projeto teve um enfoque maior no uso de concorrência para a
              análise de muitos feeds de câmeras, pois se mostrou um campo pouco
              explorado e desafiador, dadas as limitações encontradas na
              linguagem Python
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
    </>
  );
};
