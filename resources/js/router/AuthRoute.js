import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { setIntendedUrl } from '../utils/auth';
import PropTypes from 'prop-types';
import {AuthConsumer} from '../context/auth';
import AuthNav from '../components/AuthNav';
import Footer from '../components/Footer';
import DocumentTitle from 'react-document-title';

const AuthRoute = ({ component: Component, title, ...rest }) => {
  return (
    <AuthConsumer>
      {
        ({authenticated}) => (
          <Route
            {...rest}
            render={props => {
              if (!authenticated) {
                setIntendedUrl(props.location.pathname);
              }

              return authenticated ? (
                <DocumentTitle title={`${title} - ${window.App.name}`}>
                  <div className="flex flex-col min-h-screen">
                    <AuthNav />
                    <div className="flex flex-1">
                      <Component {...props} />
                    </div>
                    <Footer />
                  </div>
                </DocumentTitle>

              ) : (
                <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
              );
            }
            }
          />
        )
      }
    </AuthConsumer>
  );
};

AuthRoute.displayName = 'Auth Route';

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
  rest: PropTypes.object,
  location: PropTypes.object,
  title: PropTypes.string
};

export default AuthRoute;
