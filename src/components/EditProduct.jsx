import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import JoditEditor from "jodit-react";

const EditProduct = () => {
  const { product_id } = useParams();
  const editor = useRef(null);
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchproduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_DEVELOPMENT
          }/api/v1/product/${product_id}`
        );
        const { name, description } = response.data?.data || {};
        setFormData({ name, description });
        setContent(description);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to fetch product.");
        setLoading(false);
      }
    };

    fetchproduct();
  }, [product_id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = formData;
    if (name === "") {
      toast.error("Please fill in all the required fields");
      return;
    }
    const updateData = {
      name,
      description: content,
    };
    try {
      setLoading(true);
      await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL_DEVELOPMENT
        }/api/v1/product/${product_id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json", // Ensure JSON is sent
          },
        }
      );
      alert("Product updated successfully.");
      navigate("/dashboard/product-list");
    } catch (error) {
      console.error("Error updating product:", error.message);
      toast.error("Failed to update product.");
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <form method="post" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
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
                      value="Update product"
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

export default EditProduct;
