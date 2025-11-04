import { Navbar, Nav, NavItem, NavLink, } from "reactstrap";
import logo from "../Images/logo-t.png";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <>

      <Navbar className="header"> {/*step number 15*/}

        <Nav>

          <NavItem>
            <img src={logo} /> {/*  /> we add navitem for the logo */}
          </NavItem>

          <NavItem>

            <NavLink active href="#">

              <Link to="#">Home</Link>

            </NavLink>

          </NavItem>
          <NavItem>

            <NavLink href="/Login">Login</NavLink>

          </NavItem>


          <NavItem>

            <NavLink href="#">Profile</NavLink>

          </NavItem>

          <NavItem>

            <NavLink href="#">Logout</NavLink>

          </NavItem>

        </Nav>

      </Navbar>

    </>
  );
};

export default Header;
