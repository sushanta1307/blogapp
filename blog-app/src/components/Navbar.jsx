import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";
import {cookieContext} from "../context/CookieContext";

const Navbar = () => {
  const {setCookie, cookie} = useContext(cookieContext);

  function deleteCookie() {
    document.cookie = "authToken=;path=/;";
  }

  const handleLogout = ()=>{
    deleteCookie();
    setCookie("");
  }

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo" style={{ marginLeft: "2%" }}>
            <FontAwesomeIcon icon={faBlog} />{" "}
            <span style={{ color: "#eff702" }}>yourBlogs</span>
          </Link>
          <ul className="right hide-on-med-and-down">
            <Tippy content="Know more about Us">
              <li>
                <Link to="/blogs">About</Link>
              </li>
            </Tippy>
            <Tippy content="Read our blogs here">
              <li>
                <Link to="/blogs">Blogs</Link>
              </li>
            </Tippy>
            {!cookie ? (
              <>
                <Tippy content="Login to access our contents">
                  <li>
                    <Link to="/auth/login">Login</Link>
                  </li>
                </Tippy>
                <Tippy content="Sign Up! Its free">
                  <li>
                    <Link to="/auth/signup">SignUp</Link>
                  </li>
                </Tippy>
              </>) :
              (
                <Tippy content="Logout from this device">
                    <li>
                        <button to="/" onClick={handleLogout} style={{backgroundColor: 'inherit', border: 'None', color: 'white', cursor: 'pointer'}}>LogOut</button>
                    </li>
                </Tippy>
              )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
