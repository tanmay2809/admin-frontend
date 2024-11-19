import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import axios from "axios";

const AddJobPost = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [data, setData] = useState({
    degination: "",
    qualification: "",
    pepol: "",
    description: "",
  });

  const btnHandler = async (e) => {
    e.preventDefault();
    const { degination, qualification, pepol, description } = data;
    if (
      degination !== "" &&
      qualification !== " " &&
      pepol !== "" &&
      description !== ""
    ) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/jobPost`,
          {
            degination,
            qualification,
            pepol,
            description,
          }
        );
        console.log(response);
        toast.success("Job Posted successfully.");
        // Reset form
        setData({
          degination: "",
          qualification: "",
          pepol: "",
          description: "",
        });
      } catch (err) {
        console.error("Error: ", err.message);
        toast.error("Error adding job.");
      }
    } else {
      toast.error("Please fill all the mandatory fields.");
    }
  };
  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <form method="post" onSubmit={btnHandler}>
                  <div className="form-group">
                    <label className="form-label">
                      Degination <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="degination"
                      placeholder="Enter degination"
                      className="form-control"
                      value={data.degination}
                      onChange={formHandler}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Qualification <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      placeholder="Enter qualification"
                      className="form-control"
                      value={data.qualification}
                      onChange={formHandler}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Number Of Position <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="pepol"
                      placeholder="Enter pepol"
                      className="form-control"
                      value={data.pepol}
                      onChange={formHandler}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      name="description"
                      placeholder="Enter Job  description"
                      className="form-control"
                      rows={5}
                      value={data.description}
                      onChange={formHandler}
                      id=""
                    ></textarea>
                  </div>

                  <div className="form-group my-3">
                    <input
                      type="submit"
                      value="Add New Job"
                      className="btn btn-info"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddJobPost;
