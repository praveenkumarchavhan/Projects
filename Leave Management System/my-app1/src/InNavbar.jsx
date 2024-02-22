import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function InNavbar() {
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Leave Managment</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/newnav">Home</Nav.Link>
            <Nav.Link href="/home">Logout</Nav.Link>
            <NavDropdown title="Action" id="basic-nav-dropdown">
              <NavDropdown.Item href="/mytodo">Sent Leave Application</NavDropdown.Item>
              <NavDropdown.Item href="mytodolist">
               Application History
              </NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Ask For Help
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    
    </>
  );
}

export default InNavbar;