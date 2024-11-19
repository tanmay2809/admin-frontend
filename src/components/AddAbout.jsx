import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddAbout = () => {
  const [data, setData] = useState({
    main_about: "",
    mission: "",
    vision: "",
    core_value: "",
  });
  const [aboutId, setAboutId] = useState(null);
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/about`
        );
        const aboutData = response.data?.data[0];
        if (aboutData) {
          setData({
            main_about: aboutData.main_about,
            mission: aboutData.mission,
            vision: aboutData.vision,
            core_value: aboutData.core_value,
          });
          setAboutId(aboutData._id);
        }
      } catch (err) {
        console.error("Error fetching About: ", err);
        toast.error("Error fetching About data.");
      }
    };

    fetchAbout();
  }, []);

  const btnHandler = async (e) => {
    e.preventDefault();
    const { main_about, mission, vision, core_value } = data;

    if (main_about && mission && vision && core_value) {
      try {
        if (aboutId) {
          const response = await axios.patch(
            `${
              import.meta.env.VITE_BASE_URL_DEVELOPMENT
            }/api/v1/about/${aboutId}`,
            {
              main_about,
              mission,
              vision,
              core_value,
            }
          );
          toast.success("About updated successfully.");
        } else {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/about`,
            {
              main_about,
              mission,
              vision,
              core_value,
            }
          );
          toast.success("About added successfully.");
        }
        setData({ main_about: "", mission: "", vision: "", core_value: "" });
        setAboutId(null);
      } catch (err) {
        console.error("Error: ", err);
        toast.error("Error submitting About.");
      }
    } else {
      toast.error("Please fill all the mandatory fields.");
    }
  };
  const formHandler = (e) => {
    const { name, value } = e.target;
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
                      Main About <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      rows={5}
                      name="main_about"
                      placeholder="Enter Main About"
                      value={data.main_about}
                      onChange={formHandler}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Mission <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      rows={5}
                      name="mission"
                      placeholder="Enter Mission"
                      value={data.mission}
                      onChange={formHandler}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Vision <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      rows={5}
                      name="vision"
                      placeholder="Enter Vision"
                      value={data.vision}
                      onChange={formHandler}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Core Value <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      rows={5}
                      name="core_value"
                      placeholder="Enter Core Value"
                      value={data.core_value}
                      onChange={formHandler}
                    ></textarea>
                  </div>
                  <div className="form-group my-3">
                    <input
                      type="submit"
                      value={aboutId ? "Update About" : "Add About"}
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

export default AddAbout;
