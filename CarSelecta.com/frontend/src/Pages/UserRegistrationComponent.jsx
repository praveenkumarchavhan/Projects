import { Button } from "react-bootstrap";
const RegistrationForm = () => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-3">
          <h2>Register</h2>
          <form>
            <input
              className="form-control mt-1"
              type="email"
              name="email"
              id="email"
              placeholder="Enter email..."
            />
            <input
              className="form-control mt-1"
              type="password"
              name=""
              id="createPassword"
              placeholder="Create password..."
            />
            <input
              className="form-control mt-1"
              type="password"
              name=""
              id="confirmPassword"
              placeholder="Confirm Password"
            />
            <Button
              type="submit"
              className="form-control mt-3"
              variant="outline-success"
              // onClick={adminLoginAction}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
