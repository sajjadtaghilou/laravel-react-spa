import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthConsumer } from '../context/auth';
import useDocumentTitle from '../components/DocumentTitle';

function GuestRoute ({ component: Component, title, ...rest }) {
  useDocumentTitle(title);

  return (
    <AuthConsumer>
      {
        ({authenticated}) => (
          <Route
            {...rest}
            render={props => authenticated
              ? <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
              : <Component {...props} />
            }
          />
        )
      }

    </AuthConsumer>
  )
  ;
};

GuestRoute.displayName = 'Guest Route';

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  rest: PropTypes.object,
  location: PropTypes.object,
  title: PropTypes.string
};

export default GuestRoute;
