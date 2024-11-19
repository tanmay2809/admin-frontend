import React, { useState, useEffect } from "react";
import {
  MdDashboard,
  MdPeople,
  MdAccountBox,
  MdOutlineBusinessCenter,
  MdOutlineLibraryAdd,
  MdOutlineViewList,
} from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./style.min.css";
import SidebarMenu from "./SidebarMenu";
const Sidenavbar = () => {
  const [windowDimension, setWindowDimension] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(true);
  const detectSize = () => {
    setWindowDimension(window.innerWidth);
    if (windowDimension < 768) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  useEffect(() => {
    if (windowDimension < 768) {
      setIsOpen(false);
    }
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);

  const [item, setItem] = useState([
    {
      title: "Service Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Service",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-service",
        },
        {
          title: "Service List",
          icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
          href: "/dashboard/service-list",
        },
      ],
    },
    {
      title: "Resource Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Resource",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-resource",
        },
        {
          title: "Resource List",
          icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
          href: "/dashboard/resource-list",
        },
      ],
    },
    {
      title: "Product Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Product",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-product",
        },
        {
          title: "Product List",
          icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
          href: "/dashboard/product-list",
        },
      ],
    },
    {
      title: "Job Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Job",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-job",
        },
        {
          title: "Job List",
          icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
          href: "/dashboard/job-list",
        },
      ],
    },
    {
      title: "About Content Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add About Data",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-about-data",
        },
      ],
    },
    {
      title: "Career Content Mgmt",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add About Data",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-career",
        },
        // {
        //   title: "About List",
        //   icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
        //   href: "/dashboard/about-data-list",
        // },
      ],
    },
    {
      title: "Slider Content Mgmt",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Slider Data",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-slider-data",
        },
        {
          title: "Slider Data List",
          icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
          href: "/dashboard/slider-data-list",
        },
      ],
    },
    {
      title: "Blog Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Blog",
          icon: <MdOutlineViewList className="my__nav__icon" />,
          href: "/dashboard/blog",
        },
        // {
        //   title: "Add Category",
        //   icon: <MdAccountBox className="my__nav__icon" />,
        //   href: "/dashboard/blog-category",
        // },
        // {
        //   title: "Blog Category List",
        //   icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
        //   href: "/dashboard/blog-category-list",
        // },

        {
          title: "Blog List",
          icon: <MdOutlineViewList className="my__nav__icon" />,
          href: "/dashboard/blog-list",
        },
      ],
    },
    {
      title: "Job Post Mgmt",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add New Job",
          icon: <MdOutlineViewList className="my__nav__icon" />,
          href: "/dashboard/add-new-job",
        },
        {
          title: "All Job List",
          icon: <MdOutlineViewList className="my__nav__icon" />,
          href: "/dashboard/all-posted-job-list",
        },
      ],
    },
  ]);

  return (
    <aside className="left-sidebar" data-sidebarbg="skin5">
      {/* <!-- Sidebar scroll--> */}
      <div className="scroll-sidebar">
        {/* <!-- Sidebar navigation--> */}
        <nav className="sidebar-nav">
          <ul id="sidebarnav" className="pt-4">
            <li className="sidebar-item">
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="dash_board"
                aria-expanded="false"
              >
                <MdDashboard
                  size={23}
                  style={{
                    display: "inline-block",
                    color: "white",
                    textAlign: "center",
                    width: "35px",
                  }}
                />
                <span className="hide-menu">Dashboard</span>
              </Link>
            </li>
            {item.map((item, index) => {
              return (
                <SidebarMenu
                  title={item.title}
                  icon={item.icon}
                  dropDown={item.dropDown}
                  key={index}
                />
              );
            })}
            <li className="sidebar-item">
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/dashboard/job-list"
                aria-expanded="false"
              >
                <MdDashboard
                  size={23}
                  style={{
                    display: "inline-block",
                    color: "white",
                    textAlign: "center",
                    width: "35px",
                  }}
                />
                <span className="hide-menu">All Applicants</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/dashboard/enquiry"
                aria-expanded="false"
              >
                <MdDashboard
                  size={23}
                  style={{
                    display: "inline-block",
                    color: "white",
                    textAlign: "center",
                    width: "35px",
                  }}
                />
                <span className="hide-menu">Enquiry</span>
              </Link>
            </li>

            <li className="sidebar-item">
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link "
                to="/dashboard/logout"
                aria-expanded="false"
              >
                <BiLogOutCircle
                  size={23}
                  style={{
                    display: "inline-block",
                    color: "white",
                    textAlign: "center",
                    width: "35px",
                  }}
                />
                <span className="hide-menu">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidenavbar;
