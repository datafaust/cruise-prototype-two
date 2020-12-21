import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import classes from './pop.module.css'

class Pop extends Component {
    render() {
        return (
            <Modal
                dialogClassName={classes.modal}
                show={this.props.showModal}
                onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{this.props.summary}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={this.props.closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Pop;