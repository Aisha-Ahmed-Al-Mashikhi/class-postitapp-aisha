import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap"; //import the Reactstrap Components
import "../App.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";

const Login = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (isSuccess) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user, isError, isSuccess]);

  const handleLogin = () => {
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <div>
      {/* <h1>Login</h1>
    <img src={login} className="loginsmall"/> */}
      <Container>
        <Form>
          <Row>
            <Col md={4} className="center">
              <img src={logo} />
              <p>Email</p>
              <FormGroup floating>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setemail(e.target.value)}
                />
                <Label for="exampleEmail">Email</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="center">
              <p>Password:</p>
              <FormGroup floating>
                <Input
                  id="examplePassword"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setpassword(e.target.value)}
                />
                <Label for="examplePassword">Password</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="center">
              {" "}
              <Button
                color="primary"
                className="button"
                onClick={() => handleLogin()}
              >
                Login in
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Col md={3} className="center">
        <p className="smalltext">
          No Account? <Link to="/register">Sign Up now.</Link>
        </p>
      </Col>
    </div>
  );
};

export default Login;
