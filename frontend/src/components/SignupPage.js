// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     rollno: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const navigate = useNavigate(); 

//   const handleBlur = () => {
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/auth/signup", formData);

//       if (response.data.success) {
//         alert("Signup successful!"); // Ensure the userId is properly set
//         navigate(`/student/${response.data.student.userId}`); // Redirect to the /student route
//       } else {
//         alert(response.data.message || "Signup failed.");
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//       alert("An error occurred during signup. Please try again.");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <h2>Signup</h2>

//         <div style={styles.inputGroup}>
//           <label htmlFor="name" style={styles.label}>Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             style={styles.input}
//             required
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label htmlFor="rollno" style={styles.label}>Roll No:</label>
//           <input
//             type="text"
//             id="rollno"
//             name="rollno"
//             value={formData.rollno}
//             onChange={handleChange}
//             style={styles.input}
//             required
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label htmlFor="email" style={styles.label}>Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             style={styles.input}
//             required
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label htmlFor="password" style={styles.label}>Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             style={styles.input}
//             required
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label htmlFor="confirmPassword" style={styles.label}>Confirm Password:</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             style={styles.input}
//             required
//           />
//         </div>

//         <button type="submit" style={styles.button}>Signup</button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//   },
//   form: {
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "8px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     width: "350px",
//   },
//   inputGroup: {
//     marginBottom: "15px",
//   },
//   label: {
//     display: "block",
//     marginBottom: "5px",
//     fontWeight: "bold",
//   },
//   input: {
//     width: "100%",
//     padding: "8px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//     boxSizing: "border-box",
//   },
//   button: {
//     width: "100%",
//     padding: "10px",
//     backgroundColor: "#007BFF",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "16px",
//   },
// };

// export default SignupPage;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap"; // Import Bootstrap components

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollno: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleBlur = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError(null);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/signup", formData);

      if (response.data.success) {
        alert("Signup successful!");
        navigate(`/student/${response.data.student.userId}`);
      } else {
        setError(response.data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An error occurred during signup. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Signup</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Roll No:</Form.Label>
          <Form.Control
            type="text"
            name="rollno"
            value={formData.rollno}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">Signup</Button>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </Form>
    </Container>
  );
};

export default SignupPage;
