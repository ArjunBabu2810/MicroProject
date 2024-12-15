import React from "react";
import { Button, Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const TeacherNavBar = () => {
  const navigate = useNavigate(); // To handle navigation after logout

  const handleLogout = async () => {
    try {
      // API call for logout
      const response = await axios.post("http://localhost:5000/auth/logout");

      if (response.status === 200) {
        // Clear user data from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userType");

        // Notify user and redirect to login page
        alert("Logout successful");
        navigate("/login");
      } else {
        alert("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout.");
    }
  };

  return (
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
      <Nav className="ml-auto">
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
};

export default TeacherNavBar;
