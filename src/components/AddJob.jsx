import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import axios from "axios";
const AddJob = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const btnHandler = async (e) => {
    e.preventDefault();
    const { description, title } = data;
    if (title !== "") {
      try {
        setData({
          description: "",
          title: "",
        });
        setContent("");
      } catch (err) {
        console.log("Error" + err);
      }
      toast.success("Service Added successfully.");
    } else {
      toast.error("Please fill all the mandetary field");
    }
  };
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
                      Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter Title"
                      className="form-control"
                      value={data.title}
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
                  {/* <CKEditor
                    config={{
                      extraPlugins: [uploadPlugin],
                    }}
                    editor={ClassicEditor}
                    data={value}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setValue(data);
                      console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  /> */}
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
export default AddJob;
