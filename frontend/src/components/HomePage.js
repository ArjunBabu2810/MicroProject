import React, {  useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const HomePage = () => {

  useEffect(() => {
    const fetchSubmittedAssignments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/`);
        console.log(response);
        
      } catch (err) {
        
      }
    };

    fetchSubmittedAssignments();
  });
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundSize: "cover",
      backgroundPosition: "center",
      textAlign: "center",
    },
    heading: {
      color: "#fff",
      fontSize: "3rem",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
      marginBottom: "20px",
    },
    buttonContainer: {
      display: "flex",
      gap: "20px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1.2rem",
      color: "#fff",
      backgroundColor: "#007BFF",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      textDecoration: "none",
      textAlign: "center",
      boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Student Teacher Interaction</h1>
      <div style={styles.buttonContainer}>
        <Link to="/login" style={styles.button}>
          Login
        </Link>
        <Link to="/signup" style={styles.button}>
          Signup
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
