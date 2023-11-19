import React, { useState } from "react";
import { Modal, Form, Button } from '@themesberg/react-bootstrap';
import {questions} from '../api'
import {meetings} from '../api'
import {useMutation, useQuery} from 'react-query';




  const ModalQuestions = ({ showModal, setShowModal }) => {

    const { data: meetingsData } = useQuery([], () => meetings.listMeetings());


  const createQuestionMutation = useMutation((formData) => questions.createQuestion(formData), {
    onSuccess: () => {
      handleCloseModal()
    },
  });

  const handleCloseModal = () => {
    setSelectedMeeting("");
    setTitle("");
    setDescription("");
    setShowModal(false);
  };

  const handleCreateQuestion = (e) => {
    e.preventDefault();

    createQuestionMutation.mutate({
      title,
      description,
      selectedMeeting
    });

    handleCloseModal()
  };


  const [selectedMeeting, setSelectedMeeting] = useState("");
  const [description, setDescription] = useState("");
  const meetingOptions = meetingsData ? meetingsData.map((meeting) => meeting.title) : [];
  const [title, setTitle] = useState("");

  console.log(">>>meeting", meetingsData)
  const handleSelectMeeting = (eventKey) => setSelectedMeeting(eventKey);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);


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
            <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter the description of your problem" />
                onChange={handleDescriptionChange}

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
        <Button variant="primary" onClick={handleCreateQuestion} disabled={isDisabled}>
          Send Question
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalQuestions;
