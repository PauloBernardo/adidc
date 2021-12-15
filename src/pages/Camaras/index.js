import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header';
import { TableList } from '../../components/TableList';
import { GET_CAMERAS } from '../../services/routes';
import { setAppValue } from '../../redux/actions/app';

export const Camaras = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAppValue({ current_page: 'cameras' }));
  }, []);

  return (
    <>
      <Header title="Camaras - Listagem" />
      <TableList
        title="Câmeras"
        fields={[
          { id: 'id', label: '#' },
          { id: 'id', label: 'Nome' },
          { id: 'id', label: 'URL' },
          {
            id: 'analisys_types',
            type: 'objects',
            object_key: 'id',
            label: 'Tipo de Análise',
          },
        ]}
        onAdd={() => alert('Não implementado!')}
        buttonAddLabel="Adicionar Câmera"
        getUrl={GET_CAMERAS}
        deleteUrl="/alerta/{id}"
      />
    </>
  );
};
