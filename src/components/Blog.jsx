import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import axios from "axios";

const Blog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [data, setData] = useState({
    keyword: "",
    meta_description: "",
    title: "",
    blog_category: "",
    description: "",
  });

  // Handle Form Submit
  const btnHandler = async (e) => {
    e.preventDefault();
    const { keyword, meta_description, title, blog_category } = data;

    // Check mandatory fields
    if (
      keyword !== "" &&
      meta_description !== "" &&
      title !== "" &&
      blog_category !== ""
    ) {
      try {
        const formData = new FormData();
        formData.append("keyword", keyword);
        formData.append("meta_description", meta_description);
        formData.append("title", title);
        formData.append("blog_category", blog_category);
        formData.append("description", content); // editor content
        if (imgUrl) formData.append("image", imgUrl); // append image if available

        // Make API request
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/blog`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgresspercent(percent); // set progress bar percentage
            },
          }
        );

        toast.success("Blog added successfully.");
        console.log("Response:", response.data);

        // Reset form data
        setData({
          keyword: "",
          meta_description: "",
          title: "",
          blog_category: "",
        });
        setImgUrl(null);
        setProgresspercent(0);
        setContent("");
      } catch (err) {
        console.error("Error:", err);
        toast.error("Error adding blog, please try again.");
      }
    } else {
      toast.error("Please fill all mandatory fields");
    }
  };

  // Handle Form Change
  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  // Handle Image Change
  const imageHandler = (e) => {
    setImgUrl(e.target.files[0]);
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
                    <label>Add Image</label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={imageHandler}
                      accept="image/*"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="blogcat">Category</label>
                    <select
                      className="form-control"
                      id="blogcat"
                      onChange={formHandler}
                      name="blog_category"
                      value={data.blog_category}
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
                      value={data.keyword}
                      onChange={formHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Meta Description</label>
                    <input
                      type="text"
                      name="meta_description"
                      placeholder="Enter Meta Description"
                      className="form-control"
                      value={data.meta_description}
                      onChange={formHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter Title"
                      className="form-control"
                      value={data.title}
                      onChange={formHandler}
                    />
                  </div>

                  {/* Text Editor */}
                  <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={(newContent) => setContent(newContent)}
                  />

                  <div className="form-group mt-3">
                    <input
                      type="submit"
                      value="Add Blog"
                      className="btn btn-primary"
                    />
                  </div>
                </form>

                {/* Progress bar for image upload */}
                {progresspercent > 0 && (
                  <div className="progress mt-3">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${progresspercent}%` }}
                      aria-valuenow={progresspercent}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {progresspercent}%
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Blog;
