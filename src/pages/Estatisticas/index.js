import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header';
import { setAppValue } from '../../redux/actions/app';

export const Estatisticas = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAppValue({ current_page: 'statistic' }));
  }, []);

  return (
    <>
      <Header title="Estatísticas - Visão Geral" />

      <h1>Componente não implementado!</h1>
    </>
  );
};
