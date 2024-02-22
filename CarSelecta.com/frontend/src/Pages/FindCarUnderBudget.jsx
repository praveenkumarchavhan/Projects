import { Form } from "react-bootstrap";
import card1 from "../Images/card1.webp";
function FindCarUnderBudget() {
  return (
    <>
      <div className="container mt-5">
        <div className="mt-5">&nbsp;</div>
        <div className="row bg-light mt-5">
          <div className="col-sm-12 col-md-4 p-3">
          <Form.Check style={{width:'20px', height:'20px'}} className="p-4" aria-label="option 1" />
          </div>
          <div className="col-sm-12 col-md-7 m-0 p-0">
            <div className="card m-0 p-0 mb-3" style={{ width: "755px" }}>
              <div className="row">
                <div className="col-md-5 m-0 p-0">
                  <img src={card1} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        Last updated 3 mins ago
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default FindCarUnderBudget;
