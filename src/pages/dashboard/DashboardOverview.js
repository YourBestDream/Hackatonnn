import React, {useState} from "react";
import { Col, Row, Carousel} from '@themesberg/react-bootstrap';
import { InfoCard, TeamMembersWidget, ProgressTrackWidget, SalesValueWidget } from "../../components/Widgets";
import VotingTable from "../../components/VotingTable";
import {useQuery} from "react-query";
import {meetings} from "../../api";


export default () => {
    const [selectedMeetingId, setSelectedMeetingId] = useState(null);

    const generateMeetingsCards = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: meetingsData } = useQuery([], () => meetings.listMeetings());



    const widgetData = meetingsData
        ? meetingsData.map((meeting) => ({
            name: meeting.name+" "+meeting.surname,
            period: meeting.meetingDate,
            id: meeting.meetingId
        }))
        : [];

    const widgetsPerSlide = 3;
    const groupedWidgets = [];
    const totalItems = widgetData.length;

    const handleMeetingClick = (meetingId) => {
        console.log('Meeting clicked with ID:', meetingId);

        setSelectedMeetingId(meetingId);
    };

    const duplicatedData = [...widgetData, ...widgetData.slice(0, widgetsPerSlide)];

    for (let i = 0; i < totalItems; i += 1) {
      groupedWidgets.push(duplicatedData.slice(i, i + widgetsPerSlide));
    }

    return groupedWidgets.map((group, index) => (
        <Carousel.Item key={index}>
          <Row>
            {group.map((data, dataIndex) => (
                <Col key={dataIndex} xs={12} sm={6} xl={4} className="mb-4">
                  <InfoCard {...data} onClick={handleMeetingClick}/>
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
          <VotingTable meetingId={selectedMeetingId}/>
        </Col>
      </Row>

      </>
  );
};
