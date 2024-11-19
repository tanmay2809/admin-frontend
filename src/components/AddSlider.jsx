import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import axios from "axios";

const AddSlider = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const btnHandler = async (e) => {
    e.preventDefault();
    const { title, description } = data;
    if (title !== "" && description !== "" && imageFile !== null) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", imageFile);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/slider`,
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
          description: "",
        });
        setImageFile(null);
        toast.success("Slider added successfully.");
      } catch (err) {
        console.error("Error while adding Slider:", err.message);
        toast.error("Error while adding Slider.");
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
                      Image <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={imageHandler}
                      accept="image/*"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter title"
                      className="form-control"
                      value={data.title}
                      onChange={formHandler}
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows={5}
                      placeholder="Enter description"
                      value={data.description}
                      onChange={formHandler}
                    ></textarea>
                  </div>

                  <div className="form-group my-3">
                    <input
                      type="submit"
                      value="Add Slider"
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

export default AddSlider;
