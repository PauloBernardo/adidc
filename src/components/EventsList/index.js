import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import * as API from '../../services/api';
import { GET_TRACK_ITEM, GET_TRACK_PACK } from '../../services/routes';

export const EventsList = ({ type, id, lastUpdate }) => {
  const [events, setEvents] = useState([]);

  const reformatEvents = (assets) => {
    let newEvents = assets.events.map((e) => ({
      ...e,
      type: 'Localização',
    }));
    newEvents = newEvents.concat(
      assets.packs.map((e) => ({ ...e, type: 'Pacote' }))
    );
    newEvents = newEvents.concat(
      assets.alarms.map((e) => ({ ...e, type: 'Alarme' }))
    );
    newEvents = newEvents.concat(
      assets.owners.map((e) => ({ ...e, type: 'Dono' }))
    );
    newEvents = newEvents.concat(
      assets.holders.map((e) => ({ ...e, type: 'Mantedor' }))
    );
    console.log(newEvents);
    newEvents.sort((a, b) => {
      return a.timestamp < b.timestamp ? -1 : 1;
    });
    console.log('Sorted', newEvents);
    setEvents(newEvents || []);
  };

  const getPackEvents = () => {
    API.apiGET(GET_TRACK_PACK.replace('{id}', encodeURIComponent(id))).then(
      (resp) => {
        if (resp.has_error) {
          alert(resp.error);
          console.log(resp.error.response);
        } else {
          console.log(resp.response.data);
          if (resp.response.data.asset) {
            reformatEvents(resp.response.data.asset);
          }
        }
      }
    );
  };

  const getItemEvents = () => {
    API.apiGET(GET_TRACK_ITEM.replace('{id}', encodeURIComponent(id))).then(
      (resp) => {
        if (resp.has_error) {
          alert(resp.error);
          console.log(resp.error.response);
        } else {
          console.log(resp.response.data);
          if (resp.response.data.asset) {
            reformatEvents(resp.response.data.asset);
          }
        }
      }
    );
  };

  useEffect(() => {
    if (type === 'PACK') getPackEvents();
    if (type === 'ITEM') getItemEvents();
  }, [lastUpdate]);
  return (
    <>
      <h1>Lista de Eventos</h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Código</th>
            <th>Informação</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, idx) => {
            return (
              <tr>
                <td>{event?.type}</td>
                <td>{event?.code}</td>
                <td>{event?.information}</td>
                <td>
                  {new Date(event?.timestamp * 1000).toLocaleDateString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
