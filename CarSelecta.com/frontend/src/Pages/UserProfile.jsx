import { Button, Card } from "react-bootstrap";
import Navigationbar from "./Navigationbar";
import {
  FaAngleRight,
  FaCheckCircle,
  FaCircle,
  FaRegHeart,
  FaUserCog,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import WishList from "./WishList";
import ProfileSetting from "./ProfileSetting";
function UserProfile() {
  const favoriteRef = useRef();
  const profileRef = useRef();
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [user, setUser] = useState(null);
  const [fisrtLetter, setFirstLetter] = useState("");
  const [showFav, setShowFav] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = Cookies.get("email");
        const response = await axios.get(
          `http://localhost:8181/get-user-details?email=${email}`
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (!user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (user && user.firstName) {
      setFirstLetter(user.firstName.charAt(0));
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleFavRef = async () => {
    favoriteRef.current.classList.add("alert", "alert-primary");
    profileRef.current.classList.remove("alert", "alert-primary");
    const email = Cookies.get("email");
    try {
      const response = await axios.get(
        `http://localhost:8181/get-favorite-cars?email=${email}`
      );
      setFavoriteCars(response.data);
      setShow(true);
      setShowFav(true);
      console.log(favoriteCars);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfile = () => {
    setShowFav(false);
    setShow(true);
    favoriteRef.current.classList.remove("alert", "alert-primary");
    profileRef.current.classList.add("alert", "alert-primary");
  };

  const logoutAction = () => {
    Cookies.remove("email");
    localStorage.removeItem("loginStatus");
    window.location.replace('/');
  };

  return (
    <>
      <Navigationbar />
      <div className="mt-5">&nbsp;</div>
      <div className="mt-5" style={{ backgroundColor: "#FFFFF" }}>
        <div className="row m-5 justify-content-center">
          <div className="col-sm-12 col-md-4 d-flex justify-content-center">
            <Card
              className="shadow"
              style={{ width: "22rem", borderRadius: "10px" }}
            >
              <div
                className="text-center circle-icon-container p-3"
                style={{ backgroundColor: "#e0e4e78a" }}
              >
                <FaCircle
                  className="text-secondary  mt-5 circle-icon"
                  style={{ fontSize: "80px" }}
                />
                <span className="k-letter">{fisrtLetter}</span>
                <Card.Text className="text-center mt-2 mb-0">
                  <strong>{user.firstName + " " + user.lastName}</strong>
                </Card.Text>
                <Card.Text className="text-center mt-0 pt-0 mb-0">
                  {user.phoneNumber}
                </Card.Text>
                <Card.Text className="text-center mt-0 pt-0">
                  {user.email}
                  <small>
                    {" "}
                    <FaCheckCircle
                      style={{ fontSize: "17px" }}
                      className="text-success mb-1"
                    />
                  </small>
                </Card.Text>
              </div>

              <Card.Body className="mt-1 p-0 ">
                <Link
                  onClick={handleFavRef}
                  className=" text-decoration-none"
                  style={{ display: "block" }}
                >
                  <div
                    ref={favoriteRef}
                    className="p-2 m-1"
                    style={{
                      justifyContent: "space-between",
                      cursor: "pointer",
                    }}
                  >
                    <Link
                      className=" text-dark text-decoration-none p-5"
                      style={{ fontSize: "19px" }}
                    >
                      <FaRegHeart className="mb-1" />
                      &nbsp;&nbsp;&nbsp;&nbsp;Shortlisted Vehicles
                      <FaAngleRight
                        className="mt-1"
                        style={{
                          position: "absolute",
                          right: "5",
                        }}
                      />
                    </Link>
                  </div>
                </Link>
                <Link
                  onClick={handleProfile}
                  className=" text-decoration-none"
                  style={{ display: "block" }}
                >
                  <div
                    ref={profileRef}
                    className="  p-2 mt-1 m-1"
                    style={{ justifyContent: "space-between" }}
                  >
                    <Link
                      className=" text-dark text-decoration-none p-5"
                      style={{ fontSize: "19px" }}
                    >
                      <FaUserCog className="mb-1" />
                      &nbsp;&nbsp;&nbsp;&nbsp;Profile Setting
                      <FaAngleRight
                        className="mt-1"
                        style={{
                          position: "absolute",
                          right: "5",
                        }}
                      />
                    </Link>
                  </div>
                </Link>
                {/* <Link
                  onClick={handleFavRef}
                  className=" text-decoration-none"
                  style={{ display: "block" }}
                >
                  <div
                    className=" p-2 m-1"
                    style={{ justifyContent: "space-between" }}
                  >
                    <Link
                      className=" text-dark text-decoration-none p-5"
                      style={{ fontSize: "19px" }}
                    >
                      <FaRegHeart className="mb-1" />
                      &nbsp;&nbsp;&nbsp;&nbsp;Shortisted Vehicles
                      <FaAngleRight
                        className="mt-1"
                        style={{
                          position: "absolute",
                          right: "5",
                        }}
                      />
                    </Link>
                  </div>
                </Link> */}
                <Link
                  className=" text-decoration-none"
                  style={{ display: "block" }}
                >
                  <div className="d-grid p-2 m-4 ">
                    <Button
                      onClick={() => logoutAction()}
                      className="btn btn-block"
                      variant="outline-danger"
                    >
                      Log Out
                    </Button>
                  </div>
                </Link>
                <Card.Text style={{ marginTop: "100px" }}>&nbsp;</Card.Text>
              </Card.Body>
            </Card>
          </div>
          {show ? (
            <>
              {showFav ? (
                <div className="col-sm-12 col-md-6 mt-2">
                  <WishList Cars={favoriteCars} />
                </div>
              ) : (
                <div className="col-sm-12 col-md-6 mt-2 ">
                  <ProfileSetting userRef={user} />
                </div>
              )}
            </>
          ) : (
            <div>&nbsp;</div>
          )}
        </div>
      </div>
    </>
  );
}
export default UserProfile;
