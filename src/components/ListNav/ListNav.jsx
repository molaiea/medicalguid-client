import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './ListNav.css'
const ListNav = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className='navbar'>
        <Container fluid>
          <Navbar.Brand href="/">
          <img src={require('../../assets/icon.png')} alt="icon" className="logo_img"/>MedicalGuide</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
          
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default ListNav