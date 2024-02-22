import { Card } from "react-bootstrap";
import card1 from "../Images/admindashboardcard1.jpg";
import card2 from "../Images/admindashboardcard2.jpg";
import card3 from "../Images/admindashboardcard3.jpg";
import { Link } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";

function AdminDashboard() {
  return (
    <>
      <AdminNavBar />

      <div className="row m-5 p-5 justify-content-center ">
        <div className="col-sm-12 col-md-3 d-flex justify-content-center mt-2">
          <Link as={Link} to={"/addcarbyadmin"}>
            <Card
              className="hover-element overflow-hidden"
              style={{ width: "15rem", borderRadius: "15%" }}
            >
              <Card.Img variant="top" src={card1} />
              <Card.Body style={{ width: "15rem" }} className="textContent">
                <Card.Title className="text-center text-secondary">
                  Add Car
                </Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </div>
        <div className="col-sm-12 col-md-3 d-flex justify-content-center mt-2">
          <Link as={Link} to={"/adminupdatecar"}>
            <Card
              className="hover-element overflow-hidden"
              style={{ width: "15rem", borderRadius: "15%" }}
            >
              <Card.Img variant="top" src={card3} />
              <Card.Body style={{ width: "15rem" }} className="textContent">
                <Card.Title className="text-center text-secondary">
                  Update Car Details
                </Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </div>
        <div className="col-sm-12 col-md-3 d-flex justify-content-center mt-2">
            <Link as={Link} to={"/removecarbyadmin"}>
          <Card
            className="hover-element overflow-hidden"
            style={{ width: "15rem", borderRadius: "15%" }}
            >
            <Card.Img variant="top" src={card2} />
            <Card.Body style={{ width: "15rem" }} className="textContent">
              <Card.Title className="text-center text-secondary">
                Remove Car
              </Card.Title>
            </Card.Body>
          </Card>
              </Link>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
