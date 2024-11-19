import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { MdDelete, MdEditSquare } from "react-icons/md";

const ResourceList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getResourceList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/resource`
      );

      setData(response.data?.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching resource data:", error);
      toast.error("Failed to fetch resource list.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getResourceList();
  }, []);

  const deletebtnHandler = async (resource_id) => {
    const choice = window.confirm("Are you sure you want to delete?");
    if (choice) {
      try {
        await axios.delete(
          `${
            import.meta.env.VITE_BASE_URL_DEVELOPMENT
          }/api/v1/resource/${resource_id}`
        );
        toast.success("resource deleted successfully.");
        setData((prevData) =>
          prevData.filter((item) => item._id !== resource_id)
        );
      } catch (error) {
        console.error("Error deleting resource:", error.message);
        toast.error("Failed to delete the resource.");
      }
    } else {
      return;
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header row d-flex justify-content-between align-items-center">
                <div className="col-md-4">
                  <Link
                    to="/dashboard/add-resource"
                    className="btn btn-primary btn-sm"
                  >
                    {" "}
                    + Add resource{" "}
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered shadow-sm mt-3"
                    cellPadding={5}
                  >
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>file</th>
                        <th>Client Name</th>
                        <th>Mob. no.</th>
                        <th>email</th>
                        <th>Technology</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={9}>
                            <Skeleton count={9} />
                          </td>
                        </tr>
                      ) : data.length > 0 ? (
                        data?.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <a
                                  href={`${item?.image.replace(
                                    "/upload/",
                                    "/raw/upload/fl_attachment/"
                                  )}`} // Ensuring 'raw' type and fl_attachment for direct download
                                  download={`resource-${index + 1}.zip`}
                                >
                                  <img
                                    src={item.image}
                                    style={{
                                      height: "60px",
                                      width: "60px",
                                      borderRadius: "10px",
                                      marginRight: "5px",
                                    }}
                                    alt={`resource-${index + 1}`}
                                  />
                                </a>
                              </div>
                            </td>
                            <td>{item.title}</td>
                            <td>{item.mobno}</td>
                            <td>{item.email}</td>
                            <td>{item.tech}</td>
                            <td>{item.description}</td>

                            <td>
                              {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              {/* <Link to={`/dashboard/edit-resource/${item._id}`}>
                                <MdEditSquare
                                  size={24}
                                  style={{ color: "green" }}
                                />
                              </Link> */}
                              <button
                                className="btn"
                                onClick={() => deletebtnHandler(item._id)}
                              >
                                <MdDelete size={24} style={{ color: "red" }} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="text-center text-danger">
                          <td colSpan={6}>resource not found</td>
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
  );
};

export default ResourceList;
