import { Button, DropdownButton, Image, Nav, Navbar } from "react-bootstrap";
import logo from "../Images/Purple Badge Car Wash Logo1.png";
import Cookies from "js-cookie";
function AdminNavBar() {
  const handleAdminLogout = () => {
    Cookies.remove("admin");
    window.location.replace("/");
  };
  return (
    <>
      <Navbar
        style={{ justifyContent: "space-between" }}
        className="bg-body-tertiary shadow"
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
        <Button
          onClick={() => handleAdminLogout()}
          className="me-3"
          variant="danger"
        >
          Log Out
        </Button>
      </Navbar>
    </>
  );
}
export default AdminNavBar;
