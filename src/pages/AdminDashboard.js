import React, { useEffect, useState } from "react";
import { fetchPosts, createPost, updatePost, deletePost } from "../services/api";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";

const AdminDashboard = () => {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            alert("Unauthorized! Please log in.");
            window.location.href = "/login";
        } else {
            loadPosts();
        }
    }, [token]);  

    const loadPosts = async () => {
        try {
            const response = await fetchPosts();
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleShow = (post = null) => {
        setCurrentPost(post);
        setTitle(post ? post.title : "");
        setContent(post ? post.content : "");
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setCurrentPost(null);
    };

    const handleSave = async () => {
        if (!title || !content) {
            alert("Title and content are required.");
            return;
        }

        try {
            if (currentPost) {
                await updatePost(currentPost.id, { title, content }, token);
                setPosts(posts.map(post => post.id === currentPost.id ? { ...post, title, content } : post));
            } else {
                const response = await createPost({ title, content, author: "Admin" }, token);
                setPosts([...posts, response.data]); 
            }
            handleClose();
        } catch (error) {
            console.error("Error saving post:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await deletePost(id, token);
                setPosts(posts.filter(post => post.id !== id));  
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    return (
        <div style={styles.fullPage}>
            <Container style={styles.container}>
                <h1 style={styles.title}>Admin Dashboard</h1>
                <Button style={styles.addButton} onClick={() => handleShow()}>+ New Post</Button>
                <Table striped bordered hover className="mt-3" style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeader}>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.content}</td>
                                <td>
                                    <Button style={styles.editButton} onClick={() => handleShow(post)}>Edit</Button>{' '}
                                    <Button style={styles.deleteButton} onClick={() => handleDelete(post.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Modal for Create/Edit */}
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{currentPost ? "Edit Post" : "New Post"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label style={styles.modalLabel}>Title</Form.Label>
                                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label style={styles.modalLabel}>Content</Form.Label>
                                <Form.Control as="textarea" rows={4} value={content} onChange={(e) => setContent(e.target.value)} style={styles.input} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={styles.closeButton} onClick={handleClose}>Close</Button>
                        <Button style={styles.saveButton} onClick={handleSave}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

// ✅ Inline CSS styles
const styles = {
    fullPage: {
        width: "100vw",
        minHeight: "100vh",
        background: "url('/bg1.jpg') no-repeat center center/cover",
        paddingTop: "50px",
        paddingBottom: "50px",
    },
    container: {
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    },
    title: {
        textAlign: "center",
        color: "#007bff",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    addButton: {
        width: "20%",
        backgroundColor: "#007bff",
        border: "none",
        padding: "10px",
        fontSize: "18px",
        fontWeight: "bold",
        borderRadius: "5px",
        marginBottom: "15px",
        cursor: "pointer",
    },
    table: {
        borderRadius: "8px",
        overflow: "hidden",
    },
    tableHeader: {
        backgroundColor: "#0056b3",
        color: "#ffffff",
        textAlign: "center",
    },
    editButton: {
        backgroundColor: "#ffc107",
        border: "none",
        padding: "5px 10px",
        marginRight: "5px",
        fontWeight: "bold",
        cursor: "pointer",
    },
    deleteButton: {
        backgroundColor: "#dc3545",
        border: "none",
        padding: "5px 10px",
        fontWeight: "bold",
        cursor: "pointer",
    },
    modalLabel: {
        fontWeight: "bold",
        color: "#333",
    },
    input: {
        border: "2px solid #007bff",
        borderRadius: "5px",
        padding: "10px",
    },
    closeButton: {
        backgroundColor: "#6c757d",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
    },
    saveButton: {
        backgroundColor: "#007bff",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
    },
};

export default AdminDashboard;
