import React, { useState } from "react";
import { Modal, Form, Button } from '@themesberg/react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { meetings } from '../api';
import {useMutation} from 'react-query';
import "../scss/datepicker.css";

const ModalMeetings = ({ showModal, setShowModal }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [duration, setDuration] = useState("");




  const createMeetingMutation = useMutation((formData) => meetings.createMeeting(formData), {
    onSuccess: () => {
      handleCloseModal();
    },
  });

  const handleCloseModal = () => {
    setStartDate(new Date());
    setDuration("");
    setShowModal(false);
  };

  const handleCreateMeeting = (e) => {
    e.preventDefault();

  const formattedDate = startDate.toISOString(); // Convert date to RFC3339 format

  createMeetingMutation.mutate({
    startTime: formattedDate,
    duration: parseInt(duration, 10)
  });

    handleCloseModal();
  };

  const handleDurationChange = (e) => setDuration(e.target.value);

  const isDisabled = !startDate || !duration;

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>New Meeting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <DatePicker 
              selected={startDate} 
              onChange={(date) => setStartDate(date)} 
              showTimeSelect
              dateFormat="Pp"
              className="custom-date-picker"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Duration (in minutes)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter duration"
              value={duration}
              onChange={handleDurationChange}
              min = '0'
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCreateMeeting} disabled={isDisabled}>
          Create Meeting
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalMeetings;
