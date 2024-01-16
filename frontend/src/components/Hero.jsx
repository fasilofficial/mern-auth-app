import { Button, Card, Container, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          {userInfo?.avatar && (
            <Image
              src={userInfo.avatar}
              alt="profile"
              width="200px"
              height="200px"
              className="rounded-circle"
              style={{ margin: "1em 0", objectFit: "cover" }}
            />
          )}
          <h1 className="text-center mb-4">
            Welcome {userInfo && userInfo.name}
          </h1>
          <p className="text-center mb-4">
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library
          </p>
          <div className="d-flex">
            {userInfo ? (
              <LinkContainer to="/profile">
                <Button variant="primary" className="me-3">
                  Profile
                </Button>
              </LinkContainer>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Button variant="primary" className="me-3">
                    Sign In
                  </Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="secondary">Sign Up</Button>
                </LinkContainer>
              </>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
