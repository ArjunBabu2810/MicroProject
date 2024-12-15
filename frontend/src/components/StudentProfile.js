import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const StudentProfile = () => {
  // Sample student data
  const student = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    enrollmentNumber: 'S123456',
    courses: ['Math', 'Science', 'History'],
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Student Profile</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/student-login">Logout</Nav.Link>
        </Nav>
      </Navbar>

      <div className="container mt-5">
        <h3>Welcome, {student.name}</h3>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Enrollment Number:</strong> {student.enrollmentNumber}</p>
        <p><strong>Courses:</strong></p>
        <ul>
          {student.courses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentProfile;
