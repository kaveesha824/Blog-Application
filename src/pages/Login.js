import React, { useState } from "react";
import { loginUser } from "../services/api";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password);
            localStorage.setItem("token", response.data.token);
            alert("Login successful!");
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            alert("Invalid email or password.");
        }
    };

    return (
        <div style={styles.fullPage}> 
            <Container style={styles.container}>
                <Card style={styles.card}>
                    <Card.Body>
                        <h2 style={styles.title}>Welcome Back!</h2>
                        <p style={styles.subtitle}>Login to continue</p>
                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-3">
                                <Form.Label style={styles.label}>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={styles.input}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label style={styles.label}>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={styles.input}
                                />
                            </Form.Group>
                            <Button type="submit" style={styles.button} block>
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

// CSS styles
const styles = {
    fullPage: {
        width: "100vw", 
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "url('/bg1.jpg') no-repeat center center/cover",     },
    container: {
        width: "100%", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "400px",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#ffffff", 
    },
    title: {
        textAlign: "center",
        color: "#007bff",
        fontWeight: "bold",
    },
    subtitle: {
        textAlign: "center",
        color: "#333",
        marginBottom: "20px",
    },
    label: {
        fontWeight: "bold",
        color: "#333",
    },
    input: {
        border: "2px solid #007bff",
        borderRadius: "5px",
        padding: "10px",
    },
    button: {
        width: "100%",
        backgroundColor: "#007bff",
        border: "none",
        padding: "10px",
        fontSize: "18px",
        fontWeight: "bold",
        borderRadius: "5px",
        marginTop: "15px",
        cursor: "pointer",
        transition: "0.3s",
    },
};

export default Login;
