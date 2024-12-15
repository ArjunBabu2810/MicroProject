import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import TeacherNavBar from "./teacherNavbar";


const SubmissionsPage = () => {
  const [assignments, setAssignments] = useState([]); // To store posted assignments
  const navigate = useNavigate();

  // Fetch assignments from the backend
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // Replace with your API endpoint
        const response = await axios.get(
          "http://localhost:5000/teacher/assignments/all"
        );
        const data = await response.data.data;
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    fetchAssignments();
  }, []);

  const handleViewSubmissions = (assignmentId) => {
    navigate(`/submissions/${assignmentId}`); // Redirect to the submissions page for the assignment
  };

  return (
    <div>
      {/* Navbar */}
      <TeacherNavBar/>

      {/* Assignments Table */}
      <div className="container mt-4">
        <h3>Assignments</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Assignment Name</th>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Post Date</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.assignmentName}</td>
                <td>{assignment.subName}</td>
                <td>{assignment.teacherName}</td>
                <td>{moment(assignment.postDate).format("DD-MM-YYYY")}</td>
                <td>{moment(assignment.dueDate).format("DD-MM-YYYY")}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleViewSubmissions(assignment.id)}
                  >
                    View Submissions
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default SubmissionsPage;
