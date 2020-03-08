import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
// import ForgotPassword from '../pages/auth/ForgotPassword';
// import ResetPassword from '../pages/auth/ResetPassword';
import NotFound from '../pages/404';
import Home from '../pages/Home';
// import Profile from '../pages/Profile';
import AuthRoute from './AuthRoute';
import GuestRoute from './GuestRoute';
import { AuthConsumer } from '../context/auth';
import DocumentTitle from 'react-document-title';
import FullPageSpinner from '../components/FullPageSpinner';

function App () {
  return (
    <AuthConsumer>
      {({initializing}) => {
        return initializing
          ? <FullPageSpinner />
          : <Router>
            <div className="flex flex-col min-h-screen">
              <Switch>
                <GuestRoute exact path="/" component={Welcome} title="welcome" />
                <GuestRoute path="/register" component={Register} title="register" />
                <GuestRoute path="/login" component={Login} title="login"/>
                <AuthRoute path="/home" component={Home} title="home"/>
                {/* <GuestRoute path="/forgot-password" component={ForgotPassword} />
              <GuestRoute path="/password/reset/:token" component={ResetPassword} /> */}
                {/* <AuthRoute path="/profile/:id" component={Profile} /> */}

                <DocumentTitle title="404">
                  <Route component={NotFound}/>
                </DocumentTitle>
              </Switch>
            </div>
          </Router>;
      } }
    </AuthConsumer>
  );
};

export default App;
