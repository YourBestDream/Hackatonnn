import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Table, Pagination } from '@themesberg/react-bootstrap';
import { useMutation, useQuery } from "react-query";
import { questions } from "../api";

const VotingTable = ({ meetingId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch questions data
  const { data: questionsData, refetch } = useQuery('questionsData', () => questions.getQuestions());

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

  return (
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

export default VotingTable;
