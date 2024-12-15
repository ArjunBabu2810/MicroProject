import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Navbar } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Button } from 'react-bootstrap';

const StudentSubmittedAssignments = () => {
  const { studentId } = useParams(); // Extract studentId from URL
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmittedAssignments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/student/submitted/${studentId}`);
        setAssignments(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch assignments');
        setLoading(false);
      }
    };

    fetchSubmittedAssignments();
  }, [studentId]);

  const handleDelete = async (assignmentId) => {
    try {
      // Send DELETE request to the backend to remove the assignment
      const response = await axios.delete(`http://localhost:5000/student/submitted/delete/${assignmentId}`);
      console.log(response);
      if (response.data.success) {
        // Update the state to remove the deleted assignment
        setAssignments(assignments.filter((assignment) => assignment.id !== assignmentId));
        alert('Assignment deleted successfully');
      } else {
        alert('Failed to delete assignment');
      }
    } catch (err) {
      console.error('Error deleting assignment:', err);
      alert('Error deleting assignment');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  console.log(assignments)
  return (
    <div><Navbar bg="dark" variant="dark" style={{ padding: '20px' }}>
    <Navbar.Brand href="/">Student Dashboard</Navbar.Brand>
    
  </Navbar>
    <div className="container mt-4">
      
      <h3 className="mb-4">Submitted Assignments</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Teacher Name</th>
            <th>Subject Name</th>
            <th>Assignment Name</th>
            <th>Posted Date</th>
            <th>Due Date</th>
            <th>Submission Date</th>
            <th>Actions</th> {/* Added Actions column */}
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={assignment.sId}>
              <td>{index + 1}</td>
              <td>{assignment.teacherName}</td>
              <td>{assignment.subName}</td>
              <td>{assignment.assignmentName}</td>
              <td>{moment(assignment.postedDate).format('DD-MM-YYYY')}</td>
              <td>{moment(assignment.dueDate).format('DD-MM-YYYY')}</td>
              <td>{moment(assignment.submittedDate).format('DD-MM-YYYY')}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(assignment.sId)}>Delete</Button> {/* Delete button */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>
  );
};

export default StudentSubmittedAssignments;
