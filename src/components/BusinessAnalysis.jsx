import React, { useState, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import "./BusinessAnalysis.css";
import { doc, getDoc } from "firebase/firestore";
import init from "../firebase";
import { Link } from "react-router-dom";
import one1 from "../assets/icon/1.png";
import one2 from "../assets/icon/2.png";
import one3 from "../assets/icon/3.png";
import one4 from "../assets/icon/4.png";
import one5 from "../assets/icon/5.png";
import one6 from "../assets/icon/6.png";
import one7 from "../assets/icon/7.png";
import one8 from "../assets/icon/8.png";
import one9 from "../assets/icon/9.png";
import one10 from "../assets/icon/10.png";
const BusinessAnalysis = () => {
  const [box, setBox] = useState([
    {
      title: "Dashboard",
      quatity: "70",
      url: "https://img.icons8.com/office/256/booking.png",
      href: "/dashboard/dash_board",
    },
    {
      title: "Resource Mgmt",
      quatity: "343",
      url: one3,
      href: "/dashboard/add-resource",
    },
    {
      title: "Service Mgmt",
      quatity: "343",
      url: one3,
      href: "/dashboard/service-list",
    },
    {
      title: "Job Mgmt",
      quatity: "343",
      url: one1,
      href: "/dashboard/product-list",
    },
    {
      title: "About Mgmt",
      quatity: "343",
      url: one5,
      href: "/dashboard/add-about-data",
    },
    {
      title: "Career Content",
      quatity: "343",
      url: one7,
      href: "/dashboard/add-career",
    },
    {
      title: "Add  Blog",
      quatity: "343",
      url: one3,
      href: "/dashboard/blog",
    },
    {
      title: "Slider Content",
      quatity: "343",
      url: one4,
      href: "/dashboard/slider-data-list",
    },
    {
      title: "Add Blog",
      quatity: "343",
      url: one10,
      href: "/dashboard/blog",
    },

    {
      title: "Post Newe Job",
      quatity: "343",
      url: one4,
      href: "/dashboard/add-new-job",
    },
    {
      title: "All Posted Jobs",
      quatity: "343",
      url: one1,
      href: "/dashboard/all-posted-job-list",
    },
    {
      title: "All Applicants",
      quatity: "343",
      url: one1,
      href: "/dashboard/job-list",
    },
    {
      title: "Blog List",
      quatity: "343",
      url: one7,
      href: "/dashboard/blog-list",
    },
    {
      title: "Enquires",
      quatity: "343",
      url: one2,
      href: "/dashboard/enquiry",
    },
    {
      title: "All Products",
      quatity: "343",
      url: one8,
      href: "/dashboard/product-list",
    },
    {
      title: "All Services",
      quatity: "343",
      url: one2,
      href: "/dashboard/service-list",
    },
  ]);
  const [value, setValue] = useState(50);
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="card">
          <div className="card-body ">
            <div className="d-md-flex align-items-center">
              <h4 className="card-title text-center mb-4">Welcome Admin</h4>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  {box.map((cur, index) => {
                    return (
                      <div className="col-md-3 col-6" key={index}>
                        <div className=" p-10  text-center total_card shadow-sm ">
                          <div className="data d-flex justify-content-around">
                            <img
                              src={cur.url}
                              className="dash_icon"
                              alt="Event Planet"
                            />
                            {/* <h4 className="">{cur.quatity}</h4> */}
                          </div>
                          <Link to={cur.href}>
                            <p className="p-2">{cur.title}</p>{" "}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalysis;
