import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
            <Container>
                <Navbar.Brand as={Link} to="/">BlogApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <FaBars color="white" />
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {!token ? (
                            <>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            </>
                        ) : (
                            <NavDropdown title="Menu" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/admin">Admin</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
