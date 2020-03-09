import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthConsumer } from '../context/auth';
import DocumentTitle from 'react-document-title';

const GuestRoute = ({ component: Component, title, ...rest }) => (
  <AuthConsumer>
    {
      ({authenticated}) => (
        <Route
          {...rest}
          render={props => authenticated
            ? <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
            : <DocumentTitle title={`${title} - ${window.App.name}`}>
              <Component {...props} />
            </DocumentTitle>
          }
        />
      )
    }

  </AuthConsumer>
);

GuestRoute.displayName = 'Guest Route';

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  rest: PropTypes.object,
  location: PropTypes.object,
  title: PropTypes.string
};

export default GuestRoute;
