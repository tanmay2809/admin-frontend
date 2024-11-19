import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { MdDelete, MdEditSquare } from "react-icons/md";
import DateFinder from "./DateFinder";
import "./blog.css";
import axios from "axios";

const BlogList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBlogList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/blog`
      );

      setData(response.data?.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog data:", error.message);
      toast.error("Failed to fetch blog list.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogList();
  }, []);

  const deletebtnHandler = async (blog_id) => {
    const choice = window.confirm("Are you sure you want to delete?");
    if (choice) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/blog/${blog_id}`
        );
        toast.success("blog deleted successfully.");
        setData((prevData) => prevData.filter((item) => item._id !== blog_id));
      } catch (error) {
        console.error("Error deleting blog:", error.message);
        toast.error("Failed to delete the blog.");
      }
    } else {
      return;
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header row d-flex justify-content-between align-items-center">
                  <div className="col-md-4">
                    <Link
                      to="/dashboard/blog"
                      className="btn btn-primary btn-sm"
                    >
                      {" "}
                      + Add Blog{" "}
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table  table-bordered  shadow-sm mt-3"
                      cellPadding={5}
                    >
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Image</th>
                          <th>Keyword</th>
                          <th>Meta Desc.</th>
                          <th>Title</th>
                          <th>Slug</th>
                          <th>Category</th>
                          <th>Description</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading && (
                          <tr>
                            <td>
                              <Skeleton count="2" style={{ width: "100%" }} />
                            </td>
                            <td>
                              <Skeleton count="2" style={{ width: "100%" }} />
                            </td>
                            <td>
                              <Skeleton count="2" style={{ width: "100%" }} />
                            </td>
                            <td>
                              <Skeleton count="2" style={{ width: "100%" }} />
                            </td>
                            <td>
                              <Skeleton count="2" style={{ width: "100%" }} />
                            </td>
                            <td>
                              <Skeleton count="2" style={{ width: "100%" }} />
                            </td>
                            <td>
                              <Skeleton count="2" style={{ width: "100%" }} />
                            </td>
                            <td>
                              <Skeleton count="2" style={{ width: "100%" }} />
                            </td>
                            <td>
                              <Skeleton count="2" style={{ width: "100%" }} />
                            </td>
                            <td>
                              <Skeleton count="2" style={{ width: "100%" }} />
                            </td>
                          </tr>
                        )}
                        {data ? (
                          data.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <img
                                      src={item.image}
                                      style={{
                                        height: "60px",
                                        width: "60px",
                                        borderRadius: "10px",
                                        marginRight: "5px",
                                      }}
                                    />
                                  </div>
                                </td>
                                <td>{item.keyword}</td>
                                <td>{item.meta_description}</td>
                                <td>{item.title}</td>
                                <td>{item.slug}</td>
                                <td>{item.blog_category}</td>
                                <td>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: item.description,
                                    }}
                                    className="my_custom_style"
                                  />
                                </td>
                                <td>
                                  {new Date(
                                    item?.createdAt
                                  ).toLocaleDateString()}
                                </td>
                                {/* <td>
                                                                        <div className='d-flex align-items-center'>
                                                                            <div className="form-check form-switch ">
                                                                                <input className="form-check-input stock_checkbox" type="checkbox" id="flexSwitchCheckDefault"
                                                                                    value={item.stock}
                                                                                    onChange={(e) => switchHandler(e, item.id, index)}
                                                                                    checked={item.stock} />
                                                                            </div>
                                                                            <span className={item.stock ? 'text-success' : 'text-danger'} style={{ fontSize: '14px' }}> {item.stock ? 'Available' : 'Not Available'}</span>
                                                                        </div>
                                                                    </td> */}
                                <td>
                                  <Link to={`/dashboard/edit-blog/${item._id}`}>
                                    <MdEditSquare
                                      color="danger"
                                      size={24}
                                      style={{ color: "green" }}
                                    />
                                  </Link>
                                  <button className="btn  ">
                                    <MdDelete
                                      size={24}
                                      style={{ color: "red" }}
                                      onClick={() => deletebtnHandler(item._id)}
                                    />
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr className="text-center text-danger">
                            <td colSpan={6}>Category not found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default BlogList;
