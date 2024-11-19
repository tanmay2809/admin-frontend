import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import JoditEditor from "jodit-react";

const EditService = () => {
  const { service_id } = useParams();
  const editor = useRef(null);
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_DEVELOPMENT
          }/api/v1/service/${service_id}`
        );
        const { name, description, image } = response.data?.data || {};
        setFormData({ name, description });
        setExistingImage(image);
        setContent(description);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching service:", error);
        toast.error("Failed to fetch service.");
        setLoading(false);
      }
    };

    fetchService();
  }, [service_id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler for the image file input
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = formData;

    if (name === "" || content === "") {
      toast.error("Please fill in all the required fields");
      return;
    }

    const updateData = new FormData();
    updateData.append("name", name);
    updateData.append("description", content);
    if (imageFile) {
      updateData.append("image", imageFile);
    } else {
      updateData.append("image", existingImage);
    }

    try {
      setLoading(true);
      await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL_DEVELOPMENT
        }/api/v1/service/${service_id}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Service updated successfully.");
      navigate("/dashboard/service-list");
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service.");
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
                  <center>
                    <div>
                      <img
                        src={
                          imageFile
                            ? URL.createObjectURL(imageFile)
                            : existingImage
                        }
                        alt="blog"
                        style={{ height: "100px", width: "100px" }}
                      />
                    </div>
                  </center>
                  {/* File Input for Image */}
                  <div className="form-group my-3">
                    <label className="form-label">Image (Optional)</label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={handleImageChange}
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
                      value="Update Service"
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

export default EditService;
