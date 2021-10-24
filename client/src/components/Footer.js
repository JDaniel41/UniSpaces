import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'

export default function Footer(){

    return (
        <div className="fixed-bottom">  
            <Navbar bg="dark" variant="dark">
                <Container className="footer-container">
                    <Navbar.Brand>UniSpaces</Navbar.Brand>
                    <Navbar.Text>HackGT Fall 2021</Navbar.Text>
                </Container>
            </Navbar>
        </div>
    );
}