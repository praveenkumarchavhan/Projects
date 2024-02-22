import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/Aboutus";
import Admin from "./Pages/Admin";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminUpdateCar from "./Pages/AdminUpdateCar";
import UpdateCarByAdmin from "./Pages/UpdateCarByAdmin";
import AddCarByAdmin from "./Pages/AddCarByAdmin";
import RemoveCarByAdmin from "./Pages/RemoveCarByAdmin";
import UserLogin from "./Pages/UserLogin";
import UserSignup from "./Pages/UserSignup";
import WishList from "./Pages/WishList";
import UserProfile from "./Pages/UserProfile";
import FindCarUnderBudget from "./Pages/FindCarUnderBudget";
import CarPreview from "./Pages/CarPreview";
import CarPreviewPrice from "./Pages/CarPreviewPrice";
import UserReviews from "./Pages/UserReviews";
import WriteReview from "./Pages/WriteReview";
import ThanksForReview from "./Pages/ThanksForReview";
import Bot from "./Pages/Bot";
import Cookies from "js-cookie";
import CarPreviewAsCompany from "./Pages/CarPreviewAsCompany";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/usersignup" element={<UserSignup />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/aboutus"
            element={
              <ProtectedRoute>
                <AboutUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addcarbyadmin"
            element={
              <ProtectedRouteForAdmin>
                <AddCarByAdmin />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/admindashboard"
            element={
              <ProtectedRouteForAdmin>
                <AdminDashboard />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/adminupdatecar"
            element={
              <ProtectedRouteForAdmin>
                <AdminUpdateCar />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/updatecarbyadmin"
            element={
              <ProtectedRouteForAdmin>
                <UpdateCarByAdmin />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/removecarbyadmin"
            element={
              <ProtectedRouteForAdmin>
                <RemoveCarByAdmin />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userprofile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/findcarunderbudget"
            element={
              <ProtectedRoute>
                <FindCarUnderBudget />
              </ProtectedRoute>
            }
          />
          <Route
            path="/carpreview"
            element={
              <ProtectedRoute>
                <CarPreview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/carpreviewprice"
            element={
              <ProtectedRoute>
                <CarPreviewPrice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userreviews"
            element={
              <ProtectedRoute>
                <UserReviews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/writereview"
            element={
              <ProtectedRoute>
                <WriteReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/thanksforreview"
            element={
              <ProtectedRoute>
                <ThanksForReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/thanksforreview"
            element={
              <ProtectedRoute>
                <Bot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/carpreviewascompany"
            element={
              <ProtectedRoute>
                <CarPreviewAsCompany />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function ProtectedRoute({ children }) {
  let loginStatus = localStorage.getItem("loginStatus") === "true";
  let cookie = Cookies.get("email") === "true";
  if (!loginStatus && !cookie) {
    return <Navigate to={"/"} replace={true} />;
  }

  return children;
}

function ProtectedRouteForAdmin({ children }) {
  let cookie = Cookies.get("admin");
  console.log(cookie);
  if (!cookie) {
    return <Navigate to={"/"} replace={true} />;
  }

  return children;
}
export default App;
