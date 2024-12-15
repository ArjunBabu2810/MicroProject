import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { Navbar,Nav } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import { useParams,Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const StudentsPage = () => {
  const [assignments, setAssignments] = useState([ ]);
  const [txtFile, setTxtFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch assignments from API
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/assignment/all'); // API call
        setAssignments(response.data.data);
      } catch (err) {
        setError('Failed to fetch assignments.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleFileChange = (e) => {
    setTxtFile(e.target.files[0]);
  };

  // Function to read the content of the text file
  const readTextFile = (file) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result); // File content as string
      };

      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
      
    });
  };

  const handleUpload = async (assignmentId) => {
    if (txtFile) {
      try {
        const fileContent = await readTextFile(txtFile);
        console.log('Extracted Text Content:', fileContent);

        // Send extracted text to backend
        let formData = {userId : id,fileContent:fileContent}
        console.log(formData);
        const response = await axios.post(`http://localhost:5000/assignment/upload/${assignmentId}`, formData); 
        if(response.data.message === 'Already Submitted'){
          alert('You have already submitted this assignment.');
          return;
        }
        alert('Text file uploaded and data sent successfully!');
        console.log('Backend Response:', response.data);
      } catch (err) {
        console.error('Error processing text file:', err);
        alert('Failed to process text file. Please try again.');
      }
    } else {
      alert('Please select a text file to upload.');
    }
  };

  // const handleDelete = (assignmentId) => {
  //   console.log(`Deleting assignment ID: ${assignmentId}`);
  //   // Handle delete logic here (e.g., remove from state or send to backend)
  // };

  const today = new Date();

  const getStatus = (dueDate, submitted) => {
    const dueDateObj = new Date(dueDate);

    if (submitted) {
      return 'Submitted';
    }

    if (today > dueDateObj) {
      return 'Not Submitted';
    }

    return 'Posted';
  };
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
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" style={{ padding: '20px' }}>
        <Navbar.Brand href="#home">Student Dashboard</Navbar.Brand>
        <Nav className="mr-auto">
        <Nav.Link as={Link} to={`/student/submitted/${id}`}>
            Submitted Assignments
        </Nav.Link>
        <Nav className="ml-auto">
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </Nav>
        </Nav>
      </Navbar>

      {/* Content */}
      <div className="container mt-4">
        <h3>Assignments</h3>

        {loading ? (
          <p>Loading assignments...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <Table striped bordered hover>
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
                  <td>{assignment.teacherName}</td>
                  <td>{assignment.subName}</td>
                  <td>{assignment.assignmentName}</td>
                  <td>{moment(assignment.postedDate).format('DD-MM-YYYY')}</td>
                  <td>{moment(assignment.dueDate).format('DD-MM-YYYY')}</td>
                  <td>{getStatus(assignment.dueDate, assignment.submitted)}</td>
                  <td>
                    <Form.Group controlId={`file-upload-${assignment.id}`} className="mb-2">
                      <Form.Control
                        type="file"
                        accept=".txt"
                        onChange={handleFileChange}
                      />
                    </Form.Group>
                    {getStatus(assignment.dueDate, assignment.submitted) !== 'Not Submitted' && (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => handleUpload(assignment.id)}
                          className="mr-2"
                        >
                          Upload TXT
                        </Button>
                        {/* <Button variant="danger" onClick={() => handleDelete(assignment.id)}>
                          Delete
                        </Button> */}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;


// import React, { useState, useEffect } from 'react';
// import { Table, Button, Form } from 'react-bootstrap';
// import { Navbar } from 'react-bootstrap';
// import axios from 'axios';
// import moment from 'moment';

// const StudentsPage = () => {
//   const [assignments, setAssignments] = useState([{
//     id: 1,
//     teacherName: 'teacher 1',
//     subName: 'sub 1',
//     assignmentName: 'assignment 1',
//     postDate: '2024-12-12',
//     dueDate: '2024-12-24',
//     status: 'Posted'
//   }]);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch assignments from API
//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         console.log("Hai");
//         const response = await axios.get('http://localhost:5000/assignment/all'); // API call
//         console.log(response.data);
//         // Set only the 'data' property to assignments
//         setAssignments(response.data.data);
//       } catch (err) {
//         setError('Failed to fetch assignments.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchAssignments();
//   }, []);

//   const handleFileChange = (e) => {
//     setPdfFile(e.target.files[0]);
//   };

//   const handleUpload = (assignmentId) => {
//     if (pdfFile) {
//       console.log(`Uploading file for assignment ID: ${assignmentId}`);
//       // Handle file upload logic here (e.g., send to a backend)
//     } else {
//       alert('Please select a PDF file to upload.');
//     }
//   };

//   const handleDelete = (assignmentId) => {
//     console.log(`Deleting assignment ID: ${assignmentId}`);
//     // Handle delete logic here (e.g., remove from state or send to backend)
//   };

//   // Get today's date
//   const today = new Date();

//   // Function to calculate the status
//   const getStatus = (dueDate, submitted) => {
//     const dueDateObj = new Date(dueDate);

//     // If assignment is submitted, show "Submitted"
//     if (submitted) {
//       return 'Submitted';
//     }

//     // If the due date has passed and no submission, show "Not Submitted"
//     if (today > dueDateObj) {
//       return 'Not Submitted';
//     }

//     // Otherwise, show "Pending"
//     return 'Pending';
//   };
//   // assignments.map((assignment) => {
//   //   console.log(assignment)
//   // })
//   console.log(typeof(assignments));
//   return (
//     <div>
//       {/* Navbar */}
//       <Navbar bg="dark" variant="dark" style={{ padding: '20px' }}>
//         <Navbar.Brand href="#home">Student Dashboard</Navbar.Brand>
//       </Navbar>

//       {/* Content */}
//       <div className="container mt-4">
//         <h3>Assignments</h3>

//         {loading ? (
//           <p>Loading assignments...</p>
//         ) : error ? (
//           <p className="text-danger">{error}</p>
//         ) : (
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Teacher Name</th>
//                 <th>Subject Name</th>
//                 <th>Assignment Name</th>
//                 <th>Posted Date</th>
//                 <th>Due Date</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {assignments.map((assignment) => (
//                 <tr key={assignment.id}>
//                   <td>{assignment.teacherName}</td>
//                   <td>{assignment.subName}</td>
//                   <td>{assignment.assignmentName}</td>
//                   <td>{moment(assignment.postedDate).format("DD-MM-YYYY") }</td>
//                   <td>{moment(assignment.dueDate).format("DD-MM-YYYY")}</td>
//                   {/* <td>{assignment.status}</td> */}
//                   <td>{getStatus(assignment.dueDate, assignment.submitted)}</td> {/* Status Column */}
//                   <td>
//                     {/* File upload for PDF */}
//                     <Form.Group controlId={`file-upload-${assignment.id}`} className="mb-2">
//                       <Form.Control
//                         type="file"
//                         accept="application/pdf"
//                         onChange={handleFileChange}
//                       />
//                     </Form.Group>
//                     {getStatus(assignment.dueDate, assignment.submitted) !== 'Not Submitted' && (
//                       <>
//                         <Button
//                           variant="primary"
//                           onClick={() => handleUpload(assignment.id)}
//                           className="mr-2"
//                         >
//                           Upload PDF
//                         </Button>
//                         <Button variant="danger" onClick={() => handleDelete(assignment.id)}>
//                           Delete
//                         </Button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentsPage;
