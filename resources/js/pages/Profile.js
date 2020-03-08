import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const propTypes = {
  auth: PropTypes.object.isRequired
};

class Profile extends Component {
  render () {
    return (
      <div className="container p-2 mx-auto flex flex-col">
        <h1>This is Profile page</h1>
      </div>
    );
  }
}

Profile.propTypes = propTypes;

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Profile);
