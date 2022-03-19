import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { UserContext } from '../App'

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext)

  const RenderNav = () => {
    if (state) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tutorial">
              Tutorial
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/compiler">
              Compiler
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/logout">
              Logout
            </Link>
          </li>
        </>
      )
    } else {
      return (<>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tutorial">
            Tutorial
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/compiler">
            Compiler
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </li>
      </>)
    }

  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mx-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            CodeBase
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <RenderNav />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
