import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";

const Menu = () => {
  const padding = {
    paddingRight: 5,
    textAlign: "center",
  };
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <Nav.Link href="#" as="span">
          <Link to="/" style={padding}>
            Blogs
          </Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link to="/users">Users</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link to="/about" style={padding}></Link>
        </Nav.Link>
      </div>
      <div className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0"></div>
      <div className="col-md-3 text-end">
        <UserInfo />
      </div>
    </header>
  );
};

export default Menu;
