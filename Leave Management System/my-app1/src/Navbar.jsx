import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import InNavbar from './InNavbar';

function NewNavbar() {
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
      <a className="navbar-brand d-lg-none">
                  <img
                    src="https://www.cdac.in/img/cdac-logo-sm.png"
                    className="img-fluid"
                  />
                </a>
                <a className="navbar-brand d-lg-block d-sm-none d-none ">
                  <img
                    className="img-fluid"
                    src="https://www.cdac.in/img/cdac-logo.png"
                    alt="cdac-logo.png"
                  />
                </a>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className="nav-link  btn btn-outline-info me-5 fw-normal fs-5" href="/home"  aria-current="page">Home</Nav.Link>
            <Nav.Link className="nav-link me-4 fw-normal fs-5" href="/aboutus">About Us</Nav.Link>
            <Nav.Link className="nav-link me-4 fw-normal fs-5" href="/studentlogin">Student Login</Nav.Link>
            <Nav.Link className="nav-link me-4 fw-normal fs-5" href="/facultylogin">Faculty Login</Nav.Link>
            
            
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          
            
          </Nav>
          <Nav.Link className="nav-link me-4 fw-normal fs-5"  href="/contactus">Contact Us</Nav.Link>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  
 
}

export default NewNavbar;