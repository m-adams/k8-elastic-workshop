import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'

import Item from './Item'

class ItemModal extends Component {
  static propTypes = {
    productId: PropTypes.number.isRequired,
    handleHide: PropTypes.func.isRequired,
  };

  render() {
    const { show, handleHide, productId } = this.props

    return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Item id={productId}/>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connectModal({ name: 'itemmodal' })(ItemModal)
