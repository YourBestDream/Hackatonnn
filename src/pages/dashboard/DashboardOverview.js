import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine,faPlus, faComment} from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, Carousel} from '@themesberg/react-bootstrap';
import { InfoCard, TeamMembersWidget, ProgressTrackWidget, SalesValueWidget } from "../../components/Widgets";
import VotingTable from "../../components/VotingTable";


export default () => {
const generateMeetingsCards = () => {
    const widgetData = [
      { name: 'Official Name', period: 'Your Time', icon: faComment, iconColor: 'shape-secondary' },
      { name: 'Official Name', period: 'Your Time', icon: faComment, iconColor: 'shape-secondary' },
    ];

    const groupedWidgets = [];
    const totalItems = widgetData.length;

    const duplicatedData = [...widgetData, ...widgetData.slice(0, 3)];

    for (let i = 0; i < totalItems; i += 1) {
      groupedWidgets.push(duplicatedData.slice(i, i + 3));
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
        <Row>
        <Col xs={12}>
          <VotingTable />
        </Col>
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
