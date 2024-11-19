import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import axios from "axios";

const AddProduct = () => {
  const editor = useRef(null);
  const [content, setContent] = useState(""); // For handling description
  const [data, setData] = useState({
    name: "", // For handling product name
  });

  const btnHandler = async (e) => {
    e.preventDefault();
    const { name } = data;

    // Check if name is filled
    if (name !== "") {
      try {
        // Post the data with the name and description (content)
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/product`,
          {
            name: name,
            description: content, // The description from JoditEditor
          }
        );

        // Success toast notification
        toast.success("Product added successfully.");
        // Reset form
        setData({ name: "" });
        setContent("");
      } catch (err) {
        console.error("Error: ", err);
        toast.error("Error adding product.");
      }
    } else {
      // Error toast if name is empty
      toast.error("Please fill all the mandatory fields.");
    }
  };

  // Handle input changes
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
                      Name <span className="text-danger">*</span>
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
                      value="Add Product"
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

export default AddProduct;
