import React from 'react';
import PropTypes from 'prop-types';
import './home.scoped.scss';

/**
 * @typedef {{(): JSX.Element, propTypes?: Object<string, any>, defaultProps?: Object<string, any>}} Home
 */
/**
 * @type {Home} home
 */
const home = () => (
  <div className="home" data-testid="home">
    home Component
  </div>
);

home.propTypes = {};

home.defaultProps = {};

export default home;
