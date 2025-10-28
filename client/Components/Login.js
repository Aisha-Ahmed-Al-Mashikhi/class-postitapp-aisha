import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap"; //import the Reactstrap Components
import "../App.css";
import { Link } from "react-router-dom";
import login from "../Images/loginImage.jpg";
const Login = () => {
  return (
    <div>
      {/* <h1>Login</h1>
    <img src={login} className="loginsmall"/> */}
      <Container>
        <Form>
          <Row>
            <Col md={3}>
              <p>Email</p>
              <FormGroup floating>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Email"
                  type="email"
                />
                <Label for="exampleEmail">
                  Email
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <p>Password:</p>
              <FormGroup floating>
                <Input
                  id="examplePassword"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                <Label for="examplePassword">
                  Password
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              {' '}
              <Button>
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <p className="smalltext">

        No Account? <Link to="/register">Sign Up now.</Link>

      </p>
    </div>

  );
};

export default Login;
