import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from '@aws-amplify/auth';
import { Home } from '../pages/Home';
import Login from '../pages/Login';
import { NotFound } from '../pages/NotFound';
import { MyNavBar } from '../components/MyNavBar';
import { userLogged } from '../redux/actions/user';
import SignUp from '../pages/SignUp';
import ConfirmSignUp from '../pages/ConfirmSignUp';
import { ListProducts } from '../pages/products/ListProducts';
import { ListTimeline } from '../pages/timeline/ListTimeline';
import { ListProductItems } from '../pages/products/ListProductItems';
import { ListPacks } from '../pages/packs/ListPacks';
import { CompanyView } from '../pages/company/CompanyView';
import { AddProducts } from '../pages/products/AddProducts';
import { AddProductItem } from '../pages/products/AddProductItem';
import { ProductView } from '../pages/products/ProductView';
import { CompanyEdit } from '../pages/company/CompanyEdit';
import { UserView } from '../pages/user/UserView';
import { UserEdit } from '../pages/user/UserEdit';
import { ListUsers } from '../pages/user/ListUsers';
import { UserAdd } from '../pages/user/UserAdd';
import { PackView } from '../pages/packs/PackView';
import { TimelineView } from '../pages/timeline/TimelineView';
import { ListPromotion } from '../pages/promotion/ListPromotion';
import { PromotionView } from '../pages/promotion/PromotionView';
import { ProductItemView } from '../pages/products/ProductItemView';
import { AddTimeline } from '../pages/timeline/AddTimeline';
import { EditTimeline } from '../pages/timeline/EditTimeline';
import { About } from '../pages/About';

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
        return <NotFound />;
      }}
    />
  );
}

/*----------------------------------------------------------------------------------------------------*/

function MainNavigation() {
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

  return (
    <div>
      {loaded && (
        <>
          <MyNavBar />
          <Router>
            <Switch>
              <PrivateRoute
                path="/home"
                component={Home}
                disconnectedComponent={Login}
              />
              <PrivateRoute path="/signUp" disconnectedComponent={SignUp} />
              <PrivateRoute path="/listProducts" component={ListProducts} />
              <PrivateRoute
                path="/listProductItems"
                component={ListProductItems}
              />
              <PrivateRoute path="/listCompanies" component={CompanyView} />
              <PrivateRoute path="/companyEdit" component={CompanyEdit} />
              <PrivateRoute path="/listPackets" component={ListPacks} />
              <PrivateRoute path="/packView" component={PackView} />
              <PrivateRoute path="/addProducts" component={AddProducts} />

              <PrivateRoute path="/addProductItem" component={AddProductItem} />
              <PrivateRoute path="/editProductItem" component={AddProducts} />
              <PrivateRoute path="/productView" component={ProductView} />
              <PrivateRoute
                path="/productItemView"
                component={ProductItemView}
              />
              <PrivateRoute path="/userView" component={UserView} />
              <PrivateRoute path="/userEdit" component={UserEdit} />
              <PrivateRoute path="/userList" component={ListUsers} />
              <PrivateRoute path="/userAdd" component={UserAdd} />
              <PrivateRoute path="/timeline" component={ListTimeline} />
              <PrivateRoute path="/timelineView" component={TimelineView} />
              <PrivateRoute path="/addTimeline" component={AddTimeline} />
              <PrivateRoute path="/editTimeline" component={EditTimeline} />
              <PrivateRoute path="/listPromotion" component={ListPromotion} />
              <PrivateRoute path="/promotionView" component={PromotionView} />
              <PrivateRoute path="/aboutPage" component={About} />
              <PrivateRoute
                path="/confirmSignUp"
                disconnectedComponent={ConfirmSignUp}
              />
              <Route path="*" exact component={NotFound} />
            </Switch>
          </Router>
        </>
      )}
    </div>
  );
}

/*----------------------------------------------------------------------------------------------------*/

export default MainNavigation;
