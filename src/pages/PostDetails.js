import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostById } from "../services/api";
import { Container, Card, Spinner, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const PostDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPostById(id)
            .then(response => {
                setPost(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching post:", error);
                setLoading(false);
            });
    }, [id]);

    return (
        <div style={styles.fullPage}>
            <Container style={styles.container}>
              
                {loading ? (
                    <div style={styles.loadingContainer}>
                        <Spinner animation="border" role="status" />
                        <p style={styles.loadingText}>Loading post...</p>
                    </div>
                ) : post ? (
                    <Card style={styles.card}>

                        <Card.Body>
                        <Button variant="link" style={styles.backButton} onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Back
                </Button>
                            <Card.Title style={styles.title}>{post.title}</Card.Title>
                            <Card.Text style={styles.content}>{post.content}</Card.Text>
                            <p style={styles.author}><strong>Author:</strong> {post.author}</p>
                        </Card.Body>
                    </Card>
                ) : (
                    <p style={styles.noPost}>Post not found.</p>
                )}
            </Container>
        </div>
    );
};

//  CSS styles
const styles = {
    fullPage: {
        width: "100vw",
        minHeight: "100vh",
        background: "url('/bg1.jpg') no-repeat center center/cover", 
        paddingTop: "50px",
        paddingBottom: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        width: "60%",
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        position: "relative",
    },
    card: {
        padding: "20px",
        textAlign: "center",
    },
    title: {
        fontSize: "28px",
        fontWeight: "bold",
        color: "#0056b3",
    },
    content: {
        fontSize: "18px",
        color: "#333",
        lineHeight: "1.6",
    },
    author: {
        marginTop: "15px",
        fontSize: "16px",
        color: "#555",
    },
    loadingContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    loadingText: {
        marginTop: "10px",
        fontSize: "18px",
        color: "#ffffff",
    },
    noPost: {
        textAlign: "center",
        fontSize: "20px",
        color: "#ffffff",
    },
    backButton: {
        position: "absolute",
        top: "15px",
        left: "15px",
        fontSize: "18px",
        color: "#0056b3",
        textDecoration: "none",
        border: "none",
        background: "none",
        cursor: "pointer"
    }
};

export default PostDetails;