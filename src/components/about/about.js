import React from 'react';
import PropTypes from 'prop-types';
import './about.scoped.scss';
import view from '../../assets/images/view.jpg';

const about = () => (
  <div className="about" data-testid="about">
    about Component <br />
    <img src={ view } alt=""></img>
  </div>
);

about.propTypes = {};

about.defaultProps = {};

export default about;
