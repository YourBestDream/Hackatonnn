import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine,faPlus, faUserShield} from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, Carousel} from '@themesberg/react-bootstrap';
import { InfoCard, TeamMembersWidget, ProgressTrackWidget } from "../../components/Widgets";
import ModalQuestions from "../../components/ModalQuestions";



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
      <ModalQuestions 
        showModal={showModal} 
        handleCloseModal={handleCloseModal} 
        selectedMeeting={selectedMeeting} 
        handleSelectMeeting={handleSelectMeeting} 
        meetingOptions={meetingOptions} 
      />
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <Dropdown className="btn-toolbar">
            <Dropdown.Toggle as={Button} variant="primary" size="sm" className="me-2" onClick={handleShowModal}>
              <FontAwesomeIcon icon={faPlus} className="me-2" />New Question
            </Dropdown.Toggle>
          </Dropdown>


        </div>


        <Row className="justify-content-md-center">

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

              </Row>

            </Row>
          </Col>
        </Row>
      </>
  );
};
