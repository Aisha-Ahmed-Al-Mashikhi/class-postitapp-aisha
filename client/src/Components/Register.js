import { userSchemaValidation } from "../Validation/UserValidation";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Col,
  Label,
  Container,
  Row,
  FormGroup,
  Form,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deleteUser, registerUser } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const onSubmit = (data) => {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      alert("Validation all good!");
      dispatch(registerUser(userData));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h1 className="text-center">Register</h1>

      <Row>
        <Col md={6} className="center">
          <img src={logo} className="center" />
        </Col>
      </Row>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6} className="center">
            <FormGroup>
              <Label for="name">Name</Label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name..."
                {...register("name", {
                  onChange: (e) => setname(e.target.value),
                })}
              />
              <p className="error">{errors.name?.message}</p>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="center">
            <FormGroup>
              <Label for="email">Email</Label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email..."
                {...register("email", {
                  onChange: (e) => setemail(e.target.value),
                })}
              />
              <p className="error">{errors.email?.message}</p>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="center">
            <FormGroup>
              <Label for="password">Password</Label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password..."
                {...register("password", {
                  onChange: (e) => setpassword(e.target.value),
                })}
              />
              <p className="error">{errors.password?.message}</p>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="center">
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Re-enter your password..."
                {...register("confirmPassword", {
                  onChange: (e) => setconfirmPassword(e.target.value),
                })}
              />
              <p className="error">{errors.confirmPassword?.message}</p>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={3} className="center">
            <Button color="primary">Submit</Button>
          </Col>
        </Row>
        <Col md={3} className="center">
          <p className="smalltext">
            Already have an Account? <Link to="/login">Login now.</Link>
          </p>
        </Col>
      </Form>
    </Container>
  );
};

export default Register;
