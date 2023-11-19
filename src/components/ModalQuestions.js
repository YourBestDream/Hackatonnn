import React, { useState } from "react";
import { Modal, Form, Button } from '@themesberg/react-bootstrap';

const ModalQuestions = ({ showModal, handleCloseModal, selectedMeeting, handleSelectMeeting, meetingOptions }) => {
    const [title, setTitle] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const isDisabled = !title || !selectedMeeting;

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>New Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter title" 
                            value={title} 
                            onChange={handleTitleChange} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter the description of your problem" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Select a Meeting</Form.Label>
                        <Form.Select
                            value={selectedMeeting}
                            onChange={(e) => handleSelectMeeting(e.target.value)}
                        >
                            <option value="">Select a Meeting</option>
                            {meetingOptions.map((option, idx) => (
                                <option key={idx} value={option}>{option}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="primary" 
                    onClick={handleCloseModal}
                    disabled={isDisabled}
                >
                    Send Question
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalQuestions;
