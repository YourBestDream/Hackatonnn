import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faCloudUploadAlt, faPlus, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, Carousel, Modal, Form, DropdownButton } from '@themesberg/react-bootstrap';
import { InfoCard, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget } from "../../components/Widgets";


export default () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState("");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSelectMeeting = (eventKey) => setSelectedMeeting(eventKey);

  // Example meeting options
  const meetingOptions = ["Meeting 1", "Meeting 2", "Meeting 3"];
  const generateQuestionCards = () => {
    const widgetData = [
      { category: 'Customers', title: '345k', period: 'Feb 1 - Apr 1', percentage: 18.2, icon: faChartLine, iconColor: 'shape-secondary' },
      { category: 'Customers', title: '345k', period: 'Feb 1 - Apr 1', percentage: 18.2, icon: faChartLine, iconColor: 'shape-secondary' },
      { category: 'Custqrqeq', title: '349k', period: 'Feb 1 - Apr 1', percentage: 18.2, icon: faChartLine, iconColor: 'shape-secondary' },
      { category: 'Customeqrweqeqeqs', title: '348k', period: 'Feb 1 - Apr 1', percentage: 18.2, icon: faChartLine, iconColor: 'shape-secondary' },
      { category: 'Cers', title: '347k', period: 'Feb 1 - Apr 1', percentage: 18.2, icon: faChartLine, iconColor: 'shape-secondary' },
      { category: 'Custoers', title: '346k', period: 'Feb 1 - Apr 1', percentage: 18.2, icon: faChartLine, iconColor: 'shape-secondary' },
    ];

    const widgetsPerSlide = 3;
    const groupedWidgets = [];
    const totalItems = widgetData.length;

    const duplicatedData = [...widgetData, ...widgetData.slice(0, widgetsPerSlide)];

    for (let i = 0; i < totalItems; i += 1) {
      groupedWidgets.push(duplicatedData.slice(i, i + widgetsPerSlide));
    }

    return groupedWidgets.map((group, index) => (
        <Carousel.Item key={index}>
          <Row>
            {group.map((data, dataIndex) => (
                <Col key={dataIndex} xs={12} sm={6} xl={4} className="mb-4">
                  <InfoCard {...data} />
                </Col>
            ))}
          </Row>
        </Carousel.Item>
    ));
  };

  const generateMeetingsCards = () => {
    const widgetData = [
      { category: 'Customers', title: '345k', period: 'Feb 1 - Apr 1', percentage: 18.2, icon: faChartLine, iconColor: 'shape-secondary' },
      { category: 'Customers', title: '345k', period: 'Feb 1 - Apr 1', percentage: 18.2, icon: faChartLine, iconColor: 'shape-secondary' },
      { category: 'Custqrqeq', title: '349k', period: 'Feb 1 - Apr 1', percentage: 18.2, icon: faChartLine, iconColor: 'shape-secondary' },
      { category: 'Customeqrweqeqeqs', title: '348k', period: 'Feb 1 - Apr 1', percentage: 18.2, icon: faChartLine, iconColor: 'shape-secondary' },
      { category: 'Cers', title: '347k', period: 'Feb 1 - Apr 1', percentage: 18.2, icon: faChartLine, iconColor: 'shape-secondary' },
      { category: 'Custoers', title: '346k', period: 'Feb 1 - Apr 1', percentage: 18.2, icon: faChartLine, iconColor: 'shape-secondary' },
    ];

    const widgetsPerSlide = 3;
    const groupedWidgets = [];
    const totalItems = widgetData.length;

    const duplicatedData = [...widgetData, ...widgetData.slice(0, widgetsPerSlide)];

    for (let i = 0; i < totalItems; i += 1) {
      groupedWidgets.push(duplicatedData.slice(i, i + widgetsPerSlide));
    }

    return groupedWidgets.map((group, index) => (
        <Carousel.Item key={index}>
          <Row>
            {group.map((data, dataIndex) => (
                <Col key={dataIndex} xs={12} sm={6} xl={4} className="mb-4">
                  <InfoCard {...data} />
                </Col>
            ))}
          </Row>
        </Carousel.Item>
    ));
  };
  return (
      <>
      <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
              <Modal.Title>New Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form>
                  <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" placeholder="Enter title" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control as="textarea" rows={3} placeholder="Enter the description of your problem"/>
                  </Form.Group>
                  {/* <DropdownButton 
                    id="dropdown-meeting-select" 
                    title={selectedMeeting || "Select a Meeting"}
                    onSelect={handleSelectMeeting}>
                      {meetingOptions.map((option, idx) => (
                          <Dropdown.Item key={idx} eventKey={option}>{option}</Dropdown.Item>
                      ))}
                  </DropdownButton> */}
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
              <Button variant="primary" onClick={handleCloseModal}>
                  Send Question
              </Button>
          </Modal.Footer>
      </Modal>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <Dropdown className="btn-toolbar">
            <Dropdown.Toggle as={Button} variant="primary" size="sm" className="me-2" onClick={handleShowModal}>
              <FontAwesomeIcon icon={faPlus} className="me-2" />New Question
            </Dropdown.Toggle>
          </Dropdown>


        </div>

        <Row className="justify-content-md-center">
          <p>
            questions
          </p>
          <Carousel
              class="carousel slide carousel-fade"
              indicators={false}
              slide={true}
              wrap={true}
              nextIcon={null}
              prevIcon={null}
              fade={true}
              interval={null}
          >
            {generateQuestionCards()}
          </Carousel>

          <p>
            meetings
          </p>
          <Carousel
              class="carousel slide carousel-fade"
              indicators={false}
              slide={true}
              wrap={true}
              nextIcon={null}
              prevIcon={null}
              fade={true}
              interval={null}
          >
            {generateMeetingsCards()}
          </Carousel>
        </Row>

        <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
              title="Sales Value"
              value="10,567"
              percentage={10.57}
          />
        </Col>

        <Row>
          <Col xs={12} xl={12} className="mb-4">
            <Row>
              <Row>
                <Col xs={12} lg={6} className="mb-4">
                  <TeamMembersWidget />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <ProgressTrackWidget />
                </Col>

                <Col xs={12} className="px-0 mb-4">
                  <RankingWidget />
                </Col>
              </Row>

            </Row>
          </Col>
        </Row>
      </>
  );
};
