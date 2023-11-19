import React, {useState} from "react";
import {Col, Row, Carousel, Table, Pagination} from '@themesberg/react-bootstrap';
import { InfoCard, TeamMembersWidget, ProgressTrackWidget, SalesValueWidget } from "../../components/Widgets";
import VotingTable from "../../components/VotingTable";
import {useMutation, useQuery} from "react-query";
import {meetings, questions} from "../../api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";


export default () => {
    const [selectedMeetingId, setSelectedMeetingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    // Fetch questions data
    const { data: questionsData, refetch } = useQuery('questionsData', () => questions.listQuestions( selectedMeetingId));
    console.log(">>>>questionsssss", questionsData)
    const voteMutation = useMutation((formData) => questions.voteQuestion(formData), {
        onSuccess: () => {
            refetch(); // Refetch questions data after a successful vote
        },
    });

    const handleVoteQuestion = (questionId) => {
        voteMutation.mutate({ questionId });
    };

    // Pagination logic
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = questionsData?.slice(firstIndex, lastIndex) || [];
    const totalPages = Math.ceil(questionsData?.length || 0 / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const generateMeetingsCards = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: meetingsData } = useQuery([], () => meetings.listMeetings());



    const widgetData = meetingsData
        ? meetingsData.map((meeting) => ({
            name: meeting.name+" "+meeting.surname,
            period: meeting.meetingDate,
            meetingId: meeting.meetingId
        }))
        : [];

    const widgetsPerSlide = 3;
    const groupedWidgets = [];
    const totalItems = widgetData.length;

    const onClickHandler = (meetingId) => {
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
                  <InfoCard {...data} onClick={() => onClickHandler(data.meetingId) }/>
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

            <>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Created By</th>
                        <th>Votes</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.questionTitle}</td>
                            <td>{item.email}</td>
                            <td>{item.voteCount}</td>
                            <td>
                                <FontAwesomeIcon
                                    icon={faArrowUp}
                                    onClick={() => handleVoteQuestion(item.questionId)}
                                    style={{ color: item.votes > 0 ? 'green' : 'black', cursor: 'pointer' }}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Pagination>
                    {totalPages > 0 && [...Array(totalPages).keys()].map(number => (
                        <Pagination.Item
                            key={number + 1}
                            active={number + 1 === currentPage}
                            onClick={() => paginate(number + 1)}
                        >
                            {number + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </>
            );
            };

        </Col>
      </Row>

      </>
  );
};
