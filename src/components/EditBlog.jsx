import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import JoditEditor from "jodit-react";

const EditBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { blog_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    keyword: "",
    meta_description: "",
    title: "",
    blog_category: "",
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
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/blog/${blog_id}`
        );
        const {
          title,
          description,
          image,
          keyword,
          meta_description,
          blog_category,
        } = response.data?.data || {};
        setFormData({
          title,
          description,
          keyword,
          meta_description,
          blog_category,
        });
        setContent(description);
        setExistingImage(image);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to fetch blog.");
        setLoading(false);
      }
    };
    fetchService();
  }, [blog_id]);

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
    const { title, description, keyword, meta_description, blog_category } =
      formData;

    if (title === "" || description === "") {
      toast.error("Please fill in all the required fields");
      return;
    }

    const updatedData = new FormData();
    updatedData.append("keyword", keyword);
    updatedData.append("meta_description", meta_description);
    updatedData.append("title", title);
    updatedData.append("blog_category", blog_category);
    updatedData.append("description", content);

    if (imageFile) {
      updatedData.append("image", imageFile);
    } else {
      updatedData.append("image", existingImage);
    }

    try {
      setLoading(true);
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/blog/${blog_id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("blog updated successfully.");
      navigate("/dashboard/blog-list");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog.");
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
                  <div className="form-group">
                    <label htmlFor="blogcat">Category</label>
                    <select
                      className="form-control"
                      id="blogcat"
                      onChange={handleChange}
                      name="blog_category"
                      value={formData.blog_category}
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      <option value="Web Development">Web Development</option>
                      <option value="App Development">App Development</option>
                      <option value="Digital Marketing">
                        Digital Marketing
                      </option>
                      <option value="SEO">SEO</option>
                      <option value="Graphics Designing">
                        Graphics Designing
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Keyword</label>
                    <input
                      type="text"
                      name="keyword"
                      placeholder="Enter Keyword"
                      className="form-control"
                      value={formData.keyword}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Meta Description</label>
                    <input
                      type="text"
                      name="meta_description"
                      placeholder="Enter Meta Description"
                      className="form-control"
                      value={formData.meta_description}
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
                      value="Update blog"
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

export default EditBlog;
