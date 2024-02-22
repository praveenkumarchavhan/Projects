import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function InNavbar2() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Leave Managment</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/newnav">Home</Nav.Link>
            <Nav.Link href="/home">Logout</Nav.Link>
            <NavDropdown title="Action" id="basic-nav-dropdown">
              <NavDropdown.Item href="/applist">List Of Applications</NavDropdown.Item>
              <NavDropdown.Item href="/userlist">
               Student List
              </NavDropdown.Item>
             
              <NavDropdown.Divider />
              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default InNavbar2;