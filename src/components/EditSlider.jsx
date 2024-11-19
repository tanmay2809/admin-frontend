import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const EditSlider = () => {
  const { slider_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
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
          }/api/v1/slider/${slider_id}`
        );
        const { title, description, image } = response.data?.data || {};
        setFormData({ title, description });
        setExistingImage(image);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching slider:", error);
        toast.error("Failed to fetch slider.");
        setLoading(false);
      }
    };
    fetchService();
  }, [slider_id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = formData;

    if (title === "" || description === "") {
      toast.error("Please fill in all the required fields");
      return;
    }

    const updateData = new FormData();
    updateData.append("title", title);
    updateData.append("description", description);

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
        }/api/v1/slider/${slider_id}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Slider updated successfully.");
      navigate("/dashboard/slider-data-list");
    } catch (error) {
      console.error("Error updating slider:", error);
      toast.error("Failed to update slider.");
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
                        alt="Slider"
                        style={{ height: "100px", width: "100px" }}
                      />
                    </div>
                  </center>
                  <div className="form-group my-3">
                    <label className="form-label">
                      Image <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={handleImageChange}
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
                      value={formData.title}
                      onChange={handleChange}
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
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="form-group my-3">
                    <input
                      type="submit"
                      value="Update Slider"
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

export default EditSlider;
