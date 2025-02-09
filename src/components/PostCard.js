import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
    return (
        <Card style={styles.card}>
            <Card.Body>
                <Card.Title style={styles.title}>{post.title}</Card.Title>
                <Card.Text style={styles.content}>
                    {post.content.length > 120 ? post.content.substring(0, 120) + "..." : post.content}
                </Card.Text>
                <Button as={Link} to={`/posts/${post.id}`} style={styles.button}>
                    Read More
                </Button>
            </Card.Body>
        </Card>
    );
};

const styles = {
    card: {
        background: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        padding: "20px",
        transition: "0.3s",
        textAlign: "center",
    },
    title: {
        fontWeight: "bold",
        color: "#0056b3",
    },
    content: {
        color: "#333",
    },
    button: {
        backgroundColor: "#007bff",
        border: "none",
        padding: "10px",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "5px",
        width: "100%",
        marginTop: "10px",
        transition: "0.3s",
    },
};

export default PostCard;
