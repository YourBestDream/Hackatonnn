import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Table, Pagination } from '@themesberg/react-bootstrap';

const VotingTable = () => {
  const [data, setData] = useState([
    { title: 'Proposal 1', createdBy: 'Alice', votes: 0 },
    { title: 'Proposal 2', createdBy: 'Bob', votes: 0 },
    { title: 'Proposal 1', createdBy: 'Alice', votes: 0 },
    { title: 'Proposal 2', createdBy: 'Bob', votes: 0 },
    { title: 'Proposal 1', createdBy: 'Alice', votes: 0 },
    { title: 'Proposal 2', createdBy: 'Bob', votes: 0 },
    { title: 'Proposal 1', createdBy: 'Alice', votes: 0 },
    { title: 'Proposal 2', createdBy: 'Bob', votes: 0 },
    { title: 'Proposal 1', createdBy: 'Alice', votes: 0 },
    { title: 'Proposal 2', createdBy: 'Bob', votes: 0 },
    { title: 'Proposal 1', createdBy: 'Alice', votes: 0 },
    { title: 'Proposal 2', createdBy: 'Bob', votes: 0 },
    { title: 'Proposal 1', createdBy: 'Alice', votes: 0 },
    { title: 'Proposal 2', createdBy: 'Bob', votes: 0 },
    { title: 'Proposal 1', createdBy: 'Alice', votes: 0 },
    { title: 'Proposal 2', createdBy: 'Bob', votes: 0 },
    
    // ... add all other proposals ...
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const incrementVote = (index) => {
    const newData = [...data];
    newData[index].votes += 1;
    setData(newData);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = data.slice(firstIndex, lastIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <>
      <Table striped bordered hover>
        {/* Table Head */}
        <thead>
          <tr>
            <th>Title</th>
            <th>Created By</th>
            <th>Votes</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.createdBy}</td>
              <td>{item.votes}</td>
              <td>
                <FontAwesomeIcon 
                  icon={faArrowUp}
                  onClick={() => incrementVote(firstIndex + index)} 
                  style={{ color: item.votes > 0 ? 'green' : 'black', cursor: 'pointer' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {[...Array(totalPages).keys()].map(number => (
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
