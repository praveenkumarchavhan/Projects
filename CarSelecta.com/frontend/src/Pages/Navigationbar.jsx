import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  Image,
  InputGroup,
  Nav,
  NavDropdown,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import {
  FaCheck,
  FaExclamationCircle,
  FaPen,
  FaSearch,
  FaTrashAlt,
  FaUser,
  FaUserAlt,
  FaUserCircle,
} from "react-icons/fa";
import logo from "../Images/Purple Badge Car Wash Logo1.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import userlogin from "../Images/userlogin.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
function Navigationbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = Cookies.get("email");
        const response = await axios.get(
          `http://localhost:8181/get-user-details?email=${email}`
        );
        setUser(response.data.firstName);
        console.log(response.data.firstName);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const logOutHandler = () => {
    Cookies.remove("email");
    localStorage.removeItem("loginStatus");
    navigate("/", { replace: true });
  };
  return (
    <>
      <Navbar
        style={{ justifyContent: "space-between" }}
        className="bg-body-tertiary "
      >
        <Navbar.Brand href="/home">
          <Image
            style={{
              width: "30%",
              // aspectRatio: "3/1",
              mixBlendMode: "darken",
            }}
            src={logo}
            alt=""
          />
        </Navbar.Brand>
        <DropdownButton
          variant="light"
          className="me-4"
          id="dropdown-basic-button"
          title={"Hello " + user + "!"}
        >
          <Dropdown.Item href="/userprofile">
            <FaUserCircle style={{ fontSize: "35px" }} />
          </Dropdown.Item>
          <Dropdown.Item href="/userprofile">Favorite</Dropdown.Item>
          <Dropdown.Item onClick={logOutHandler}>Log Out</Dropdown.Item>
        </DropdownButton>
        {/* <Dropdown size>
          <Dropdown.Toggle variant="light" id="user-dropdown">
          <small>{user}</small>
          </Dropdown.Toggle>
          
          <Dropdown.Menu style={{minWidth:'200px'}}>
          <Dropdown.Item href="#profile">Profile</Dropdown.Item>
          <Dropdown.Item href="#settings">Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#logout">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
        {/* <Button
            style={{ top: "10px", right: "5px", position: "absolute" }}
            variant="primary"
            className="ml"
            >
            Top Right Button
          </Button> */}
      </Navbar>

      <Navbar
        style={{ width: "block" }}
        className="shadow"
        bg="light"
        expand="lg"
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/aboutus">About CarSelecta</Nav.Link>
            {/* <Nav.Link href="#home">Electric cars</Nav.Link> */}
            <NavDropdown title="Popular Brands" id="basic-nav-dropdown">
              <NavDropdown.Item
                as={Link}
                to={"/carpreviewascompany"}
                state={{ value: "Maruti Suzuki" }}
              >
                Maruti Suzuki Cars
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to={"/carpreviewascompany"}
                state={{ value: "Hyundai" }}
              >
                Hyundai Cars
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to={"/carpreviewascompany"}
                state={{ value: "Kia" }}
              >
                Kia Cars
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to={"/carpreviewascompany"}
                state={{ value: "Mahindra" }}
              >
                Mahindra Cars
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to={"/carpreviewascompany"}
                state={{ value: "Tata" }}
              >
                Tata Cars
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
export default Navigationbar;
