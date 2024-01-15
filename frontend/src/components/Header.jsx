import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
  Image,
} from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { useAdminLogoutMutation } from "../slices/adminApiSlice";
import { adminLogout } from "../slices/adminAuthSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { adminInfo } = useSelector((state) => state.adminAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useAdminLogoutMutation();

  const logoutHandler = async (isAdmin) => {
    try {
      await logoutApiCall().unwrap();
      if (isAdmin) dispatch(adminLogout());
      else dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.err(err?.data?.message || err.message);
    }
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to={adminInfo ? "/admin" : "/"}>
            <Navbar.Brand>MERN App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {adminInfo && useLocation().pathname !== "/" && !userInfo && (
                <>
                  <NavDropdown title={adminInfo.name} id="username">
                    <NavDropdown.Item onClick={() => logoutHandler(true)}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              {userInfo ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={() => logoutHandler()}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  <div>
                    <Image
                      src={userInfo.avatar}
                      alt="profile"
                      width="40px"
                      height="40px"
                      className="rounded-circle"
                      style={{ margin: "1em 0", objectFit: "cover" }}
                    />
                  </div>
                </div>
              ) : (
                !adminInfo && (
                  <>
                    <LinkContainer to="/login">
                      <Nav.Link>
                        <FaSignInAlt /> Sign In
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/register">
                      <Nav.Link>
                        <FaSignOutAlt /> Sign Up
                      </Nav.Link>
                    </LinkContainer>
                  </>
                )
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
