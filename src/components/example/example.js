import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './example.scoped.scss';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
/**
 * @typedef {{(): JSX.Element, propTypes?: Object<string, any>, defaultProps?: Object<string, any>}} ExampleComponent
 */
/**
 * @type {ExampleComponent} Example
 */
const Example = () => {

  const [show, setShow] = useState(true);

  return (
    <div className="Example" data-testid="Example">
      <Alert show={show} variant="success">
        <Alert.Heading>How's it going?!</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me y'all!
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert Button</Button>}
    </div>
  )
};

Example.propTypes = {};

Example.defaultProps = {};

export default Example;
