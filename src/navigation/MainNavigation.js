import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from '@aws-amplify/auth';
import { Home } from '../pages/Home';
import Login from '../pages/Login';
import { NotFound } from '../pages/NotFound';
import { MyNavBar } from '../components/MyNavBar';
import { userLogged, userLogout } from '../redux/actions/user';
import SignUp from '../pages/SignUp';
import ConfirmSignUp from '../pages/ConfirmSignUp';
import { About } from '../pages/About';
import { BrandName, ButtonLogout, Item } from './styles';

import brand from '../brand.png';
import { Camaras } from '../pages/Camaras';
import { Configuracao } from '../pages/Configuracao';
import { Estatisticas } from '../pages/Estatisticas';

/*----------------------------------------------------------------------------------------------------*/

function PrivateRoute({
  component: Component,
  disconnectedComponent: DisconnectedComponent,
  ...rest
}) {
  const logged = useSelector((state) => state.user.logged);

  return (
    <Route
      {...rest}
      render={(props) => {
        console.log('Logged', logged, Component);
        if (logged) {
          return <Component {...props} {...rest.props} />;
        }
        if (DisconnectedComponent)
          return <DisconnectedComponent {...props} {...rest.props} />;
        return <Redirect to="/home" />;
      }}
    />
  );
}

/*----------------------------------------------------------------------------------------------------*/

function MainNavigation() {
  const logged = useSelector((state) => state.user.logged);
  const currentPage = useSelector((state) => state.app.current_page);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const checkIsLogged = async () => {
    const user = await Auth.currentUserInfo();
    console.log('user', user);
    if (user) dispatch(userLogged({ logged: true, user: user.attributes }));
  };

  useEffect(() => {
    checkIsLogged().finally(() => setLoaded(true));
  }, []);

  const onLogout = () => {
    Auth.signOut()
      .then(() => {
        dispatch(userLogout());
      })
      .catch(() => alert('Falha ao deslogar'));
  };

  return (
    <div>
      {loaded && (
        <>
          <MyNavBar />
          {logged ? (
            <div className="container-fluid">
              <div className="row">
                <nav
                  id="sidebarMenu"
                  style={{ backgroundColor: '#00391B', minHeight: '100vh' }}
                  className="col-md-3 col-lg-2 d-md-block sidebar collapse"
                >
                  <BrandName
                    className="navbar-brand col-md-3 col-lg-2 me-0 px-3"
                    href="#/home"
                  >
                    <img
                      style={{ borderRadius: 10, marginRight: 10 }}
                      src={brand}
                      width={50}
                      height={50}
                      alt="Ícone"
                    />
                    ADIDC
                  </BrandName>
                  <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                      <li className="nav-item text-white">
                        <Item
                          active={currentPage === 'dashboard'}
                          className="nav-link"
                          aria-current="page"
                          href="#/home"
                        >
                          <span data-feather="home" />
                          Painel
                        </Item>
                      </li>
                      <li className="nav-item">
                        <Item
                          active={currentPage === 'cameras'}
                          className="nav-link"
                          href="#/camaras"
                        >
                          <span data-feather="file" />
                          Câmeras
                        </Item>
                      </li>
                      <li className="nav-item">
                        <Item
                          active={currentPage === 'statistic'}
                          className="nav-link"
                          href="#/statistic"
                        >
                          <span data-feather="shopping-cart" />
                          Estatísticas
                        </Item>
                      </li>
                      <li className="nav-item">
                        <Item
                          active={currentPage === 'config'}
                          className="nav-link"
                          href="#/config"
                        >
                          <span data-feather="users" />
                          Configurações
                        </Item>
                      </li>
                    </ul>
                  </div>
                  <ButtonLogout onClick={onLogout}>Sair</ButtonLogout>
                </nav>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                  <Router>
                    <Switch>
                      <PrivateRoute
                        path="/home"
                        component={Home}
                        disconnectedComponent={Login}
                      />
                      <PrivateRoute
                        path="/signUp"
                        disconnectedComponent={SignUp}
                        component={Home}
                      />
                      <PrivateRoute path="/aboutPage" component={About} />
                      <PrivateRoute
                        path="/confirmSignUp"
                        disconnectedComponent={ConfirmSignUp}
                      />

                      <PrivateRoute path="/camaras" component={Camaras} />
                      <PrivateRoute path="/config" component={Configuracao} />
                      <PrivateRoute
                        path="/statistic"
                        component={Estatisticas}
                      />
                      <Route path="*" exact component={NotFound} />
                    </Switch>
                  </Router>
                </main>
              </div>
            </div>
          ) : (
            <Router>
              <Switch>
                <PrivateRoute
                  path="/home"
                  component={Home}
                  disconnectedComponent={Login}
                />
                <PrivateRoute
                  path="/signUp"
                  disconnectedComponent={SignUp}
                  component={Home}
                />
                <PrivateRoute path="/aboutPage" component={About} />
                <PrivateRoute
                  path="/confirmSignUp"
                  disconnectedComponent={ConfirmSignUp}
                />
                <PrivateRoute path="/camaras" component={Camaras} />
                <PrivateRoute path="/config" component={Configuracao} />
                <PrivateRoute path="/statistic" component={Estatisticas} />
                <Route path="*" exact component={NotFound} />
              </Switch>
            </Router>
          )}
        </>
      )}
    </div>
  );
}

/*----------------------------------------------------------------------------------------------------*/

export default MainNavigation;
