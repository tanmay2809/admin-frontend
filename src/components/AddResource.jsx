import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddResource = () => {
  const [data, setData] = useState({
    title: "",
    mobno: "",
    email: "",
    tech: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const btnHandler = async (e) => {
    e.preventDefault();
    const { title, mobno, email, tech, description } = data;
    if (title !== "" && mobno !== "" && imageFile !== null) {
      const formData = new FormData();
      formData.append("mobno", mobno);
      formData.append("email", email);
      formData.append("title", title);
      formData.append("tech", tech);
      formData.append("description", description);
      formData.append("image", imageFile);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/resource`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("this is response", response.data);
        setData({
          title: "",
          mobno: "",
          email: "",
          tech: "",
          description: "",
        });
        setImageFile(null);
        toast.success("Resource added successfully.");
      } catch (err) {
        console.error("Error while adding Resource:", err.message);
        toast.error("Error while adding Resource.");
      }
    } else {
      toast.error("Please fill all the mandatory fields");
    }
  };

  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const imageHandler = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <form method="post" onSubmit={btnHandler}>
                  <div className="form-group my-3">
                    <label className="form-label">
                      Project Resource File
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={imageHandler}
                      //   accept="image/*"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Client Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter Client Name"
                      className="form-control"
                      value={data.title}
                      onChange={formHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Client Mobile Number{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="mobno"
                      placeholder="Enter Client Mobile Number"
                      className="form-control"
                      value={data.mobno}
                      onChange={formHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Client Email ID <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="EnterClient Email ID"
                      className="form-control"
                      value={data.email}
                      onChange={formHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Technology <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="tech"
                      placeholder="Enter tech like:html,css, js bootstrap"
                      className="form-control"
                      value={data.tech}
                      onChange={formHandler}
                    />
                  </div>
                  <div>
                    <label className="form-label">
                      Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      rows={5}
                      type="text"
                      name="description"
                      placeholder="Enter Remark"
                      className="form-control"
                      value={data.description}
                      onChange={formHandler}
                    ></textarea>
                  </div>

                  <div className="form-group my-3">
                    <input
                      type="submit"
                      value="Add Resource"
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

export default AddResource;
