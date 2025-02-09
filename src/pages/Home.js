import React, { useEffect, useState } from "react";
import { fetchPosts, searchPosts } from "../services/api";
import PostCard from "../components/PostCard";
import { Container, Row, Col, Spinner, Form, Button, Pagination } from "react-bootstrap";

const Home = () => {
    const [posts, setPosts] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    //  Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        fetchPosts()
            .then(response => {
                setPosts(response.data || []); 
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
                setPosts([]);
                setLoading(false);
            });
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (query.trim() === "") {
                const response = await fetchPosts();
                setPosts(response.data || []); 
            } else {
                const response = await searchPosts(query);
                setPosts(response.data || []);
            }
        } catch (error) {
            console.error("Error searching posts:", error);
            setPosts([]); 
        }
        setLoading(false);
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={styles.fullPage}>
            <Container>
                <h1 style={styles.title}>Latest Blog Posts</h1>

                {/* Search Bar */}
                <Form onSubmit={handleSearch} style={styles.searchContainer}>
                    <Form.Control
                        type="text"
                        placeholder="Search blog posts..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={styles.searchInput}
                    />
                    <Button type="submit" style={styles.searchButton}>Search</Button>
                </Form>

                {loading ? (
                    <div style={styles.loadingContainer}>
                        <Spinner animation="border" role="status" />
                        <p style={styles.loadingText}>Loading posts...</p>
                    </div>
                ) : (
                    <>
                        <Row>
                            {currentPosts.length > 0 ? (
                                currentPosts.map(post => (
                                    <Col key={post.id} sm={12} md={6} lg={4} className="mb-4">
                                        <PostCard post={post} />
                                        {/* Comments Section */}
                                        <div style={styles.commentsSection}>
                                            <h5 style={styles.commentsTitle}>Comments:</h5>
                                            {post.comments && post.comments.length > 0 ? (
                                                post.comments.map((comment, index) => (
                                                    <p key={index} style={styles.comment}>
                                                        <strong>{comment.user}:</strong> {comment.text}
                                                    </p>
                                                ))
                                            ) : (
                                                <p style={styles.noComments}>No comments yet.</p>
                                            )}
                                        </div>
                                    </Col>
                                ))
                            ) : (
                                <p style={styles.noPosts}>No blog posts available.</p>
                            )}
                        </Row>

                        {/*Pagination */}
                        {posts.length > postsPerPage && (
                            <Pagination style={styles.pagination}>
                                {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
                                    <Pagination.Item
                                        key={i + 1}
                                        active={i + 1 === currentPage}
                                        onClick={() => paginate(i + 1)}
                                    >
                                        {i + 1}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
};

// Styles
const styles = {
    fullPage: {
        width: "100%",
        minHeight: "100vh",
        background: "url('/bg1.jpg') no-repeat center center/cover",
        paddingTop: "50px",
        paddingBottom: "50px",
    },
    title: {
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "bold",
        marginBottom: "30px",
    },
    searchContainer: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
    },
    searchInput: {
        width: "60%",
        padding: "10px",
        borderRadius: "5px",
        marginRight: "10px",
        border: "1px solid #ddd",
    },
    searchButton: {
        backgroundColor: "#007bff",
        border: "none",
        padding: "10px 20px",
        fontWeight: "bold",
        borderRadius: "5px",
        cursor: "pointer",
    },
    loadingContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
    },
    loadingText: {
        marginTop: "10px",
        color: "#ffffff",
        fontSize: "18px",
    },
    noPosts: {
        textAlign: "center",
        color: "#ffffff",
        fontSize: "18px",
    },
    commentsSection: {
        background: "#f8f9fa",
        padding: "10px",
        borderRadius: "5px",
        marginTop: "10px",
    },
    commentsTitle: {
        fontSize: "16px",
        fontWeight: "bold",
    },
    comment: {
        fontSize: "14px",
        marginBottom: "5px",
    },
    noComments: {
        fontSize: "14px",
        color: "#777",
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
    },
};

export default Home;
