import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from '@aws-amplify/auth';
import { userLogout } from '../../redux/actions/user';

export const MyNavBar = () => {
  const logged = useSelector((state) => state.user.logged);
  const user = useSelector((state) => state.user.user || {});
  const dispatch = useDispatch();
  console.log(user);

  const onLogout = () => {
    Auth.signOut()
      .then(() => {
        dispatch(userLogout());
      })
      .catch(() => alert('Falha ao deslogar'));
  };

  const linksCompany = () => {
    return <></>;
  };

  const linksUser = () => {
    return (
      <>
        <Nav.Link href="#userView">Usuário</Nav.Link>
      </>
    );
  };

  const linksConnected = () => {
    return (
      <>
        <Nav.Link href="#listCompanies">Empresa</Nav.Link>
        {user['custom:pessoa_id'] ? linksUser() : linksCompany()}
        <NavDropdown title="Registros" id="basic-nav-dropdown">
          <NavDropdown.Item href="#listProducts">Produtos</NavDropdown.Item>
          <NavDropdown.Item href="#listPackets">Pacotes</NavDropdown.Item>
          <NavDropdown.Item href="#timeline">Timeline</NavDropdown.Item>
          <NavDropdown.Item href="#listPromotion">Promoções</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#aboutPage">Sobre</Nav.Link>
        <Nav.Link onClick={onLogout}>Sair</Nav.Link>
      </>
    );
  };

  const linksDisconnected = () => {
    return (
      <>
        <Nav.Link href="#aboutPage">Sobre</Nav.Link>
      </>
    );
  };

  return null;
};
