import React, { useEffect, useState } from "react";
import { Table, Button, Modal,} from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import TeacherNavBar from "./teacherNavbar";


const ViewSubmissionsPage = () => {
  const { assignmentId } = useParams(); // Extract the assignment ID from the route parameters
  const [submissions, setSubmissions] = useState([]);
  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState(null);


  // Fetch submissions and assignment details
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch submissions for the assignment
        const submissionsResponse = await axios.get(
          `http://localhost:5000/teacher/assignments/submissions/${assignmentId}`
        );
        setSubmissions(submissionsResponse.data.data);

        // Fetch assignment details
        const assignmentResponse = await axios.get(
          `http://localhost:5000/teacher/assignments/${assignmentId}`
        );
        setAssignmentDetails(assignmentResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [assignmentId]);

  const handleClose = () => setShowModal(false);
  const handleShow = (submission) => {
    setCurrentSubmission(submission);
    setShowModal(true);
  };

  return (
    <div>
        <TeacherNavBar/>
      <div className="container mt-4">
        <h3>Submissions for Assignment</h3>
        {assignmentDetails && (
          <div className="mb-4">
            <h5>Assignment Details</h5>
            <p>
              <strong>Assignment Name:</strong>{" "}
              {assignmentDetails[0].assignmentName}
            </p>
            <p>
              <strong>Subject:</strong> {assignmentDetails[0].subName}
            </p>
            <p>
              <strong>Teacher:</strong> {assignmentDetails[0].teacherName}
            </p>
            <p>
              <strong>Due Date:</strong>{" "}
              {moment(assignmentDetails[0].dueDate).format("DD-MM-YYYY")}
            </p>
          </div>
        )}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Submitted Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length > 0 ? (
              submissions.map((submission) => (
                <tr key={submission.id}>
                  <td>{submission.rollno}</td>
                  <td>{submission.name}</td>
                  <td>
                    {moment(submission.submittedDate).format("DD-MM-YYYY")}
                  </td>
                  <td>{submission.status}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleShow(submission)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Modal for submission content */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Submission Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentSubmission && (
              <>
                <p>
                  <strong>Roll No:</strong> {currentSubmission.rollno}
                </p>
                <p>
                  <strong>Submitted By:</strong> {currentSubmission.name}
                </p>
                <p>
                  <strong>Submitted Date:</strong>{" "}
                  {moment(currentSubmission.submittedDate).format("DD-MM-YYYY")}
                </p>
                <p>
                  <strong>Content:</strong>
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: currentSubmission.content,
                  }}
                ></div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ViewSubmissionsPage;
