import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls

const AddAssignmentPage = () => {
  // State to manage form data
  const [teacherName, setTeacherName] = useState("");
  const [subName, setSubName] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [postDate, setPostDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate(); // To redirect after form submission

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect all form data into an object
    const newAssignment = {
      teacherName,
      subName,
      assignmentName,
      postDate,
      dueDate,
    };

    try {
      // Make the POST request to save the assignment
      const response = await axios.post("http://localhost:5000/teacher/assignments/add", newAssignment);

      if (response.data.success) {
        alert("Assignment added successfully!");
        navigate("/teacher"); // Redirect to the teacher dashboard
      } else {
        alert("Failed to add the assignment. Please try again.");
      }
    } catch (error) {
      console.error("Error while adding assignment:", error);
      alert("An error occurred while adding the assignment. Please try again.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="primary" variant="primary">
        <Navbar.Brand href="#home" style={{ padding: "20px" }}>
          Teacher Dashboard
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/teacher">
            Assignments
          </Nav.Link>
          <Nav.Link as={Link} to="/submissions">
            Submissions
          </Nav.Link>
          <Nav.Link as={Link} to="/students">
            Students
          </Nav.Link>
        </Nav>
      </Navbar>

      {/* Add Assignment Form */}
      <Container className="mt-4">
        <h3>Add New Assignment</h3>
        <Form onSubmit={handleSubmit}>
          {/* Teacher Name */}
          <Form.Group controlId="formTeacherName">
            <Form.Label>Teacher Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter teacher's name"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              required
            />
          </Form.Group>

          {/* Subject Name */}
          <Form.Group controlId="formSubName" className="mt-3">
            <Form.Label>Subject Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subject name"
              value={subName}
              onChange={(e) => setSubName(e.target.value)}
              required
            />
          </Form.Group>

          {/* Assignment Name */}
          <Form.Group controlId="formAssignmentName" className="mt-3">
            <Form.Label>Assignment Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter assignment name"
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
              required
            />
          </Form.Group>

          {/* Post Date */}
          <Form.Group controlId="formPostDate" className="mt-3">
            <Form.Label>Post Date</Form.Label>
            <Form.Control
              type="date"
              value={postDate}
              onChange={(e) => setPostDate(e.target.value)}
              required
            />
          </Form.Group>

          {/* Due Date */}
          <Form.Group controlId="formDueDate" className="mt-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit" className="mt-4">
            Add Assignment
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddAssignmentPage;
