import { useRef, useState } from "react";
import InNavbar from "./InNavbar";

import Bottom1 from "./Bottom";

function MyTodo() {
  let formRef = useRef();
  let [successBox, setSuccessBox] = useState(false);
  let [todo, setTodo] = useState({
    task: "",
    description: "",
    numpref: "",
    startDate: "",
    endDate: "",
    status: "Pending",
    isCompleted: false,
  });

  let handleChangeTaskAction = (e) => {
    let taskValue = e.target.value;
    
    // Remove any leading/trailing whitespaces
    
    
    // Remove any non-alphabetic characters
    taskValue = taskValue.replace(/[^a-zA-Z\s]+$/, '');
    ///^[a-zA-Z\s]+$/
    let newTodo = { ...todo, task: taskValue };
    setTodo(newTodo);
  };
  let handleChangeDescriptionAction = (e) => {
    let newTodo = { ...todo, description: e.target.value };
    setTodo(newTodo);
  };

  let handleChangeNumPrefAction = (e) => {
    let newTodo = { ...todo, numpref: e.target.value };
    setTodo(newTodo);
  };

  let handleChangeStartDateAction = (e) => {
    let newTodo = { ...todo, startDate: e.target.value };
    setTodo(newTodo);
  };

  let handleChangeEndDateAction = (e) => {
    let newTodo = { ...todo, endDate: e.target.value };
    setTodo(newTodo);
  };

  let addTodoAction = async () => {
    formRef.current.classList.add("was-validated");
    let formStatus = formRef.current.checkValidity();
    if (!formStatus) {
      return;
    }

    let url = `http://localhost:4000/addtodo?task=${todo.task}&description=${todo.description}&numpref=${todo.numpref}&startDate=${todo.startDate}&endDate=${todo.endDate}&status=${todo.status}&isCompleted=${todo.isCompleted}`;
    await fetch(url);

    let newTodo = {
      task: "",
      description: "",
      numpref: "",
      startDate: "",
      endDate: "",
      status: "Pending",
      isCompleted: false,
    };
    setTodo(newTodo);

    setSuccessBox(true);
    setTimeout(() => {
      setSuccessBox(false);
    }, 5000);

    formRef.current.classList.remove("was-validated");
  };

  return (
    <>
      <InNavbar />
      <div className="img-fluid" style={{ 
      backgroundImage: `url("https://www.cdac.in/img/int-banner2.jpg")` }}>
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-6">
          <form ref={formRef} className="needs-validation">
            <h1>Leave Application Form</h1>
            <input
              id="taskInput"
              className="form-control form-control-lg mb-2"
              type="text"
              placeholder="Enter Your Name"
              value={todo.task}
              onChange={handleChangeTaskAction}
              required
            />

            <textarea
              className="form-control mb-2"
              cols="30"
              rows="3"
              placeholder="Enter Description Of Leave"
              value={todo.description}
              onChange={handleChangeDescriptionAction}
              required
            ></textarea>

            <select
              className="form-select mb-2"
              aria-label="Default select example"
              onChange={handleChangeNumPrefAction}
              required
            >
              <option selected>Reason for leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Medical Leave">Medical Leave</option>
              <option value="Emergency Leave">Emergency Leave</option>
            </select>

            <div className="row mb-2">
              <div className="col">
                <label>Start Date:</label>
                <input
                  className="form-control"
                  type="date"
                  value={todo.startDate}
                  onChange={handleChangeStartDateAction}
                  required
                />
              </div>
              <div className="col">
                <label>End Date:</label>
                <input
                  className="form-control"
                  type="date"
                  value={todo.endDate}
                  onChange={handleChangeEndDateAction}
                  required
                />
              </div>
            </div>

            <input
              className="btn btn-lg btn-secondary bg-orange w-100"
              type="button"
              value="Sent"
              onClick={addTodoAction}
            />
          </form>

          {successBox && (
            <div className="alert alert-success">Operation Success</div>
          )}
        </div>
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-sm-12 col-md-6">
          <div className="alert alert-info">
            Current Status: {todo.status}
          </div>
        </div>
      </div>
</div>
      <Bottom1 />
    </>
  );
}

export default MyTodo;
