import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import axios from "axios";

const AddService = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const btnHandler = async (e) => {
    e.preventDefault();
    const { name } = data;
    if (name !== "" && content !== "" && imageFile !== null) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", content);
      formData.append("image", imageFile);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/service`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("this is response", response.data);
        setData({
          name: "",
          description: "",
        });
        setContent("");
        setImageFile(null);
        toast.success("Service added successfully.");
      } catch (err) {
        console.error("Error while adding service:", err.message);
        toast.error("Error while adding service.");
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
    setImageFile(e.target.files[0]); // Set the selected image file to state
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <form method="post" onSubmit={btnHandler}>
                  {/* Added input for Image File */}
                  <div className="form-group my-3">
                    <label className="form-label">
                      Image <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={imageHandler}
                      accept="image/*" // Ensure only image files can be selected
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      className="form-control"
                      value={data.name}
                      onChange={formHandler}
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      Description <span className="text-danger">*</span>
                    </label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      onChange={(newContent) => setContent(newContent)}
                    />
                  </div>

                  <div className="form-group my-3">
                    <input
                      type="submit"
                      value="Add Service"
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

export default AddService;
