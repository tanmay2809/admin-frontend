import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { MdDelete, MdEditSquare } from "react-icons/md";

const ServiceList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getServiceList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/service`
      );

      setData(response.data?.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching service data:", error);
      toast.error("Failed to fetch service list.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getServiceList();
  }, []);

  const deletebtnHandler = async (service_id) => {
    const choice = window.confirm("Are you sure you want to delete?");
    if (choice) {
      try {
        await axios.delete(
          `${
            import.meta.env.VITE_BASE_URL_DEVELOPMENT
          }/api/v1/service/${service_id}`
        );
        toast.success("Service deleted successfully.");
        setData((prevData) =>
          prevData.filter((item) => item._id !== service_id)
        );
      } catch (error) {
        console.error("Error deleting service:", error.message);
        toast.error("Failed to delete the service.");
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
                    to="/dashboard/add-service"
                    className="btn btn-primary btn-sm"
                  >
                    {" "}
                    + Add Service{" "}
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
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Slug</th>
                        <th>Date</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={6}>
                            <Skeleton count={6} />
                          </td>
                        </tr>
                      ) : data.length > 0 ? (
                        data.map((item, index) => (
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
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.slug}</td>
                            <td>
                              {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              <Link to={`/dashboard/edit-service/${item._id}`}>
                                <MdEditSquare
                                  size={24}
                                  style={{ color: "green" }}
                                />
                              </Link>
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
                          <td colSpan={6}>Service not found</td>
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

export default ServiceList;
