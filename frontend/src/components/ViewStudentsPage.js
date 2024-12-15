import React, { useState, useEffect } from 'react';
import { Table, Button, } from 'react-bootstrap';
import axios from 'axios';
import TeacherNavBar from "./teacherNavbar";



const ViewStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editStudentId, setEditStudentId] = useState(null); // To track the student being edited
  const [editedStudent, setEditedStudent] = useState({
    name: '',
    email: '',
  });

  // Fetch students from backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/teacher/all');
        setStudents(response.data.data); // Assuming the response contains the list of students
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch students');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Handle changes in the editable fields
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Save button click
  const handleSave = async (studentId) => {
    try {
      const response = await axios.put(`http://localhost:5000/teacher/student/update/${studentId}`, editedStudent);
      console.log(response);
      const updatedStudents = students.map((student) =>
        student.id === studentId ? { ...student, ...editedStudent } : student
      );
      setStudents(updatedStudents);
      setEditStudentId(null); // Exit edit mode
    } catch (err) {
      setError('Failed to update student data');
    }
  };

  // Handle Edit button click
  const handleEditClick = (student) => {
    setEditStudentId(student.id); // Set the student to be edited
    setEditedStudent({
      name: student.name,
      email: student.email,
    });
  };

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
       <TeacherNavBar/>

    <div className="container mt-4">
      <h3>Students</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student Roll No</th>
            <th>Student Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students
            .sort((a, b) => a.rollno - b.rollno)
            .map((student) => (
              <tr key={student.id}>
                <td>{student.rollno}</td>
                <td>
                  {editStudentId === student.id ? (
                    <input
                    type="text"
                    name="name"
                    value={editedStudent.name}
                    onChange={handleEditChange}
                    className="form-control"
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td>
                  {editStudentId === student.id ? (
                    <input
                    type="email"
                    name="email"
                    value={editedStudent.email}
                    onChange={handleEditChange}
                    className="form-control"
                    />
                  ) : (
                    student.email
                  )}
                </td>
                <td>
                  {editStudentId === student.id ? (
                    <Button variant="success" onClick={() => handleSave(student.id)}>
                      Save
                    </Button>
                  ) : (
                    <Button variant="warning" onClick={() => handleEditClick(student)}>
                      Edit
                    </Button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
    </div>
  );
};

export default ViewStudentsPage;
