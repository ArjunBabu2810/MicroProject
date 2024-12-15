// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Importing useNavigate for redirection
// import axios from "axios";

// const LoginPage = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null);
//     const navigate = useNavigate(); // Hook for navigation

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             // Make the login API call
//             const response = await axios.post("http://localhost:5000/auth/login", {
//                 email, // Use email field directly
//                 password, // Use password field directly
//             });
        
//             // Extract data from the response
//             if (response.data.success) {
//                 const { token, userId, userType } = response.data;
        
//                 // Store the token securely in localStorage or a state management solution
//                 localStorage.setItem("token", token);
        
//                 // Redirect based on userType (student, teacher, or admin)
//                 if (userType === "student") {
//                     navigate(`/student/${userId}`);
//                 } else if (userType === "admin") {
//                     navigate("/teacher");
//                 }  else {
//                     navigate("/"); // Default fallback route
//                 }
//             } else {
//                 setError("Invalid credentials, please try again.");
//             }
//         } catch (error) {
//             console.error("Login error:", error);
        
//             // Handle specific server errors
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("Login failed, please try again later.");
//             }
//         }
        
//     };

//     return (
//         <div style={styles.container}>
//             <form onSubmit={handleSubmit} style={styles.form}>
//                 <h1>Student Management</h1>
//                 <h2>Login</h2>

//                 {error && <div style={styles.error}>{error}</div>}

//                 <div style={styles.inputGroup}>
//                     <label htmlFor="email" style={styles.label}>
//                         Email:
//                     </label>
//                     <input
//                         type="email"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         style={styles.input}
//                         required
//                     />
//                 </div>

//                 <div style={styles.inputGroup}>
//                     <label htmlFor="password" style={styles.label}>
//                         Password:
//                     </label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         style={styles.input}
//                         required
//                     />
//                 </div>

//                 <button type="submit" style={styles.button}>
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//     },
//     form: {
//         backgroundColor: "#fff",
//         padding: "20px",
//         borderRadius: "8px",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//         width: "300px",
//     },
//     inputGroup: {
//         marginBottom: "15px",
//     },
//     label: {
//         display: "block",
//         marginBottom: "5px",
//         fontWeight: "bold",
//     },
//     input: {
//         width: "100%",
//         padding: "8px",
//         border: "1px solid #ccc",
//         borderRadius: "4px",
//         boxSizing: "border-box",
//     },
//     button: {
//         width: "100%",
//         padding: "10px",
//         backgroundColor: "#007BFF",
//         color: "#fff",
//         border: "none",
//         borderRadius: "4px",
//         cursor: "pointer",
//         fontSize: "16px",
//     },
//     error: {
//         color: "red",
//         marginBottom: "15px",
//     },
// };

// export default LoginPage;








// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom"; // Importing useNavigate for redirection
// // import axios from "axios";

// // const LoginPage = () => {
// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [error, setError] = useState(null);
// //     const navigate = useNavigate(); // Hook for navigation

// //     const handleSubmit = async (event) => {
// //         event.preventDefault();

// //         try {
// //             // Make the login API call
// //             const response = await axios.post("http://localhost:5000/auth/login", {
// //                 name: email,
// //                 password: password,
// //             });
// //             console.log(response.data.success);

// //             if (response.data.success) {
// //                 // Store user data in localStorage or state management
// //                 const { userId, userType } = response.data;

// //                 localStorage.setItem("userId", userId);
// //                 localStorage.setItem("userType", userType);

// //                 // Redirect based on userType (student or teacher)
// //                 if (userType === "student") {
// //                     navigate(`/student/${response.data.userId}`);
// //                 } else if (userType === "admin") {
// //                     navigate("/teacher"); // Redirect to teacher page
// //                 }
// //             } else {
// //                 setError("Invalid credentials, please try again.");
// //             }
// //         } catch (error) {
// //             console.error("Login error:", error);
// //             setError("Login failed, please try again later.");
// //         }
// //     };

// //     return (
// //         <div style={styles.container}>
// //             <form onSubmit={handleSubmit} style={styles.form}>
// //                 <h1>Student Management</h1>
// //                 <h2>Login</h2>

// //                 {error && <div style={styles.error}>{error}</div>}

// //                 <div style={styles.inputGroup}>
// //                     <label htmlFor="email" style={styles.label}>
// //                         Email:
// //                     </label>
// //                     <input
// //                         type="email"
// //                         id="email"
// //                         value={email}
// //                         onChange={(e) => setEmail(e.target.value)}
// //                         style={styles.input}
// //                         required
// //                     />
// //                 </div>

// //                 <div style={styles.inputGroup}>
// //                     <label htmlFor="password" style={styles.label}>
// //                         Password:
// //                     </label>
// //                     <input
// //                         type="password"
// //                         id="password"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                         style={styles.input}
// //                         required
// //                     />
// //                 </div>

// //                 <button type="submit" style={styles.button}>
// //                     Login
// //                 </button>
// //             </form>
// //         </div>
// //     );
// // };

// // const styles = {
// //     container: {
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center",
// //         height: "100vh",
// //     },
// //     form: {
// //         backgroundColor: "#fff",
// //         padding: "20px",
// //         borderRadius: "8px",
// //         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
// //         width: "300px",
// //     },
// //     inputGroup: {
// //         marginBottom: "15px",
// //     },
// //     label: {
// //         display: "block",
// //         marginBottom: "5px",
// //         fontWeight: "bold",
// //     },
// //     input: {
// //         width: "100%",
// //         padding: "8px",
// //         border: "1px solid #ccc",
// //         borderRadius: "4px",
// //         boxSizing: "border-box",
// //     },
// //     button: {
// //         width: "100%",
// //         padding: "10px",
// //         backgroundColor: "#007BFF",
// //         color: "#fff",
// //         border: "none",
// //         borderRadius: "4px",
// //         cursor: "pointer",
// //         fontSize: "16px",
// //     },
// //     error: {
// //         color: "red",
// //         marginBottom: "15px",
// //     },
// // };

// // export default LoginPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for redirection
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap"; // Import Bootstrap components

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Make the login API call
            const response = await axios.post("http://localhost:5000/auth/login", {
                email,
                password,
            });

            if (response.data.success) {
                const { token, userId, userType } = response.data;

                // Store the token securely in localStorage
                localStorage.setItem("token", token);

                // Redirect based on userType
                if (userType === "student") {
                    navigate(`/student/${userId}`);
                } else if (userType === "admin") {
                    navigate("/teacher");
                } else {
                    navigate("/"); // Default fallback route
                }
            } else {
                setError("Invalid credentials, please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Login failed, please try again later.");
        }
    };

    return (
        <Container style={styles.container}>
            <Form onSubmit={handleSubmit} style={styles.form}>
                <h1>Student Management System</h1>
                <h2>Login</h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form.Group style={styles.inputGroup}>
                    <Form.Label htmlFor="email">Email:</Form.Label>
                    <Form.Control
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group style={styles.inputGroup}>
                    <Form.Label htmlFor="password">Password:</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button type="submit" style={styles.button} variant="primary">
                    Login
                </Button>

                <p className="mt-3">
                    Don't have an account?{" "}
                    <a href="/signup" style={styles.signupLink}>
                        Sign Up
                    </a>
                </p>
            </Form>
        </Container>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
    },
    form: {
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
    },
    inputGroup: {
        marginBottom: "15px",
    },
    button: {
        width: "100%",
        padding: "12px",
        fontSize: "16px",
    },
    signupLink: {
        color: "#007BFF",
        textDecoration: "none",
    },
};

export default LoginPage;
