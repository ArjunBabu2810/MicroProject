import React, { useState, useEffect } from "react";
import { Button, Table} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import TeacherNavBar from "./teacherNavbar";


const TeacherDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(null); // Track the assignment being edited
  const [editedAssignment, setEditedAssignment] = useState({}); // Track the edited details

  // Fetch assignments using useEffect
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/teacher/assignments/all"
        ); // Replace with your backend API endpoint
        setAssignments(response.data.data); // Assuming API returns { data: [...] }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setError("Failed to load assignments");
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleEdit = (id) => {
    setEditMode(id);
    const assignment = assignments.find((item) => item.id === id);
    setEditedAssignment(assignment); // Set the current assignment for editing
  };

  const handleChange = (e, field) => {
    setEditedAssignment({ ...editedAssignment, [field]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/teacher/assignments/update/${id}`,
        editedAssignment
      ); // Replace with your backend update endpoint
      console.log(response);
      setAssignments(
        assignments.map((assignment) =>
          assignment.id === id ? { ...editedAssignment } : assignment
        )
      );
      setEditMode(null); // Exit edit mode
    } catch (err) {
      console.error("Error saving assignment:", err);
      alert("Failed to save assignment");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/assignments/delete/${id}`); // Replace with your backend delete endpoint
      const updatedAssignments = assignments.filter(
        (assignment) => assignment.id !== id
      );
      setAssignments(updatedAssignments);
    } catch (err) {
      console.error("Error deleting assignment:", err);
      setError("Failed to delete assignment");
    }
  };
  console.log(assignments);

  const handleAddAssignment = () => {
    alert("Add new assignment");
  };

  if (loading) {
    return <div className="container mt-4">Loading assignments...</div>;
  }

  if (error) {
    return <div className="container mt-4 text-danger">{error}</div>;
  }

  return (
    <div>
       <TeacherNavBar/>

      <div className="container mt-4">
        <h3>Assignments</h3>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Teacher Name</th>
              <th>Subject Name</th>
              <th>Assignment Name</th>
              <th>Posted Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>
                  {editMode === assignment.id ? (
                    <input
                      type="text"
                      value={editedAssignment.teacherName || ""}
                      onChange={(e) => handleChange(e, "teacherName")}
                    />
                  ) : (
                    assignment.teacherName
                  )}
                </td>
                <td>
                  {editMode === assignment.id ? (
                    <input
                      type="text"
                      value={editedAssignment.subName || ""}
                      onChange={(e) => handleChange(e, "subName")}
                    />
                  ) : (
                    assignment.subName
                  )}
                </td>
                <td>
                  {editMode === assignment.id ? (
                    <input
                      type="text"
                      value={editedAssignment.assignmentName || ""}
                      onChange={(e) => handleChange(e, "assignmentName")}
                    />
                  ) : (
                    assignment.assignmentName
                  )}
                </td>
                <td>
                  {editMode === assignment.id ? (
                    <input
                      type="date"
                      value={
                        editedAssignment.postDate
                          ? new Date(editedAssignment.postDate)
                              .toISOString()
                              .substr(0, 10)
                          : "" // Ensure the value is a valid date string
                      }
                      onChange={(e) => handleChange(e, "postDate")}
                    />
                  ) : (
                    moment(assignment.postDate).format("DD-MM-YYYY")
                  )}
                </td>

                <td>
                  {editMode === assignment.id ? (
                    <input
                      type="date"
                      value={
                        editedAssignment.dueDate
                          ? new Date(editedAssignment.dueDate)
                              .toISOString()
                              .substr(0, 10)
                          : "" // Ensure the value is a valid date string
                      }
                      onChange={(e) => handleChange(e, "dueDate")}
                    />
                  ) : (
                    moment(assignment.dueDate).format("DD-MM-YYYY")
                  )}
                </td>
                <td>
                  {editMode === assignment.id ? (
                    <input
                      type="text"
                      value={editedAssignment.aStatus || ""}
                      onChange={(e) => handleChange(e, "aStatus")}
                    />
                  ) : (
                    assignment.aStatus
                  )}
                </td>
                <td>
                  {editMode === assignment.id ? (
                    <>
                      <Button
                        variant="success"
                        onClick={() => handleSave(assignment.id)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setEditMode(null)}
                        className="ml-2"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(assignment.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(assignment.id)}
                        className="ml-2"
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button
          variant="success"
          as={Link}
          to="/addassignment"
          onClick={handleAddAssignment}
          style={{ position: "fixed", bottom: "20px", right: "20px" }}
        >
          Add Assignment
        </Button>
      </div>
    </div>
  );
};

export default TeacherDashboard;
