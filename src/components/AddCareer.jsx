import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import JoditEditor from "jodit-react";
const AddCareer = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const [aboutId, setAboutId] = useState(null);
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/career`
        );
        const aboutData = response.data?.data[0];
        if (aboutData) {
          setData({
            name: aboutData.name,
          });
          setContent(aboutData.description);
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
    const { name } = data;

    if (name) {
      try {
        if (aboutId) {
          const response = await axios.patch(
            `${
              import.meta.env.VITE_BASE_URL_DEVELOPMENT
            }/api/v1/career/${aboutId}`,
            {
              name,
              description: content,
            }
          );
          toast.success("career updated successfully.");
        } else {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/career`,
            {
              name,
              description: content,
            }
          );
          toast.success("career added successfully.");
        }
        setData({ name: "" });
        setContent("");
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
                      Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      className="form-control"
                      value={data.name}
                      onChange={formHandler}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Description <span className="text-danger">*</span>
                    </label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      onChange={(newContent) => setContent(newContent)}
                      required
                    />
                  </div>

                  <div className="form-group my-3">
                    <input
                      type="submit"
                      value={aboutId ? "Update Career" : "Add Career"}
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

export default AddCareer;
