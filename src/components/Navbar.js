import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog, faEnvelopeOpen, faSignOutAlt, faUserShield, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Nav, Image, Navbar, Dropdown, Container, ListGroup, Button } from '@themesberg/react-bootstrap';
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import {Routes} from "../routes";
import {useHistory} from "react-router-dom";
import {getEmail} from "../api"
import {getRole} from "../api"
import ModalQuestions from "./ModalQuestions";
import ModalMeetings from "./ModalMeetings";



export default () => {

  const history = useHistory();


  function handleSettingsClick() {
    history.push(Routes.Settings.path);

  }

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);

  const [showModalMeeting, setShowModalMeeting] = useState(false);
  const handleShowModalMeeting = () => setShowModalMeeting(true);

  const email = getEmail();
  const role = getRole();

  return (
<>
      <ModalQuestions
          showModal={showModal}
          setShowModal={setShowModal}
      />
      <ModalMeetings
        showModal={showModalMeeting}
        setShowModal={setShowModalMeeting}
      />
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100 align-items-center">
          <>
          {role === "OFFICIAL" ? (
              <Button variant="primary" size="sm" className="me-2" onClick = {handleShowModalMeeting}>
                <FontAwesomeIcon icon={faPlus} className="me-2"/> New Meeting
              </Button>
          ) : (
              <Button variant="primary" size="sm" className="me-2" onClick={handleShowModal}>
                <FontAwesomeIcon icon={faPlus} className="me-2" /> New Question
              </Button>
              )}
          </>
          <div className="d-flex align-items-center">
            <Nav className="align-items-center">

              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                  <div className="media d-flex align-items-center">
                    <Image src={Profile3} className="user-avatar md-avatar rounded-circle" />
                    <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                      <span className="mb-0 font-small fw-bold">{email}</span>
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                  <Dropdown.Item className="fw-bold">
                    <FontAwesomeIcon icon={faUserCircle} className="me-2" /> My Profile
                  </Dropdown.Item>
                  <Dropdown.Item className="fw-bold" onClick={handleSettingsClick}>
                    <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
                  </Dropdown.Item>
                  <Dropdown.Item className="fw-bold">
                    <FontAwesomeIcon icon={faEnvelopeOpen} className="me-2" /> Messages
                  </Dropdown.Item>
                  <Dropdown.Item className="fw-bold">
                    <FontAwesomeIcon icon={faUserShield} className="me-2" /> Support
                  </Dropdown.Item>

                  <Dropdown.Divider />

                  <Dropdown.Item className="fw-bold">
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </div>
        </div>
      </Container>
    </Navbar>
</>
  );
};
