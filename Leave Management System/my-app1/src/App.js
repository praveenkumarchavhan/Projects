import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import AboutUS from "./AboutUs";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

import NewNavbar from "./Navbar";

import Contact from "./ContactUs";

import Home from "./Homepage";
import CandidateLogin from "./CandidateLogin";
import FacultyLogin from "./FacultyLogin";
import CandidateForgotPassword from "./CandidateForgotPassword";
import FacultyForgetPass from "./FacultyForgetPass";

import StudentRegistration1 from "./demo";
import Facultyreg from "./demo1";

import MyTodo from "./demo4";
import MyTodoList from "./demo5";
import InNavbar from "./InNavbar";
import MyUserList from "./UserList";
import InNavbar2 from "./InNavbar2";
import Applicationlist from "./ApplicationList";

function App() {
  return (
    <>
      <BrowserRouter>
       
        <Routes>
        

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/aboutus" element={<AboutUS />} />
          <Route path="/studentlogin" element={<CandidateLogin />} />
          <Route path="/facultylogin" element={<FacultyLogin />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/candfor" element={<CandidateForgotPassword />} />
          <Route path="/falfor" element={<FacultyForgetPass />} />
          <Route path="/stdreg" element={<StudentRegistration1 />} />
          <Route path="/falreg" element={<Facultyreg />} />

          <Route
            path="/newnav"
            element={
              <ProtectedRouteCan>
                <InNavbar />
              </ProtectedRouteCan>
            }
          />
          <Route
            path="/mytodo"
            element={
              <ProtectedRouteCan>
                <MyTodo />
              </ProtectedRouteCan>
            }
          />
          <Route
            path="/mytodolist"
            element={
              <ProtectedRouteCan>
                <MyTodoList />
              </ProtectedRouteCan>
            }
          />
          <Route
            path="/facnavbar"
            element={
              <ProtectedRoutefac>
                <InNavbar2 />
              </ProtectedRoutefac>
            }
          />
          <Route
            path="/userlist"
            element={
              <ProtectedRoutefac>
                <MyUserList />
              </ProtectedRoutefac>
            }
          />
          <Route
            path="/applist"
            element={
              <ProtectedRoutefac>
                <Applicationlist />
              </ProtectedRoutefac>
            }
          />

          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
function ProtectedRouteCan({ children }) {
  let loginStatus = localStorage.getItem("loginStatuscan");
  if (!loginStatus) {
    return <Navigate to={"/home"} replace={true} />;
  }

  return children;
}
function ProtectedRoutefac({ children }) {
  let loginStatus = localStorage.getItem("loginStatusfac");
  if (!loginStatus) {
    return <Navigate to={"/home"} replace={true} />;
  }

  return children;
}

export default App;
