import { userSchemaValidation } from "../Validation/UserValidation";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
  Button,
  Col,
  Label,
  Container,
  Row,
  FormGroup,
  Input,
  Form,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addUser, deleteUser } from "../Features/UserSlice";
import { Link } from "react-router-dom";



const Register = () => {

  const userList = useSelector((state) => state.users.value);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const {

    register,

    handleSubmit, // Submit the form when this is called

    formState: { errors },

  } = useForm({

    resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver

  });

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    try {

      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      console.log("Form Data", data); // You can handle the form submission here
      alert("Validation all good.");
      dispatch(addUser(userData));
    }
    catch (error) {
      console.log(error);
    }

  }
  const handleDelete = (email) => {
    try {
      dispatch(deleteUser(email));
    }
    catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            Name<br></br>
            <input type="text" name="name" {...register("name", {
              value: name,
              onChange: (e) => setname(e.target.value)
            })}>
            </input>{name}
          </Col>
          <p className="error">{errors.name?.message}</p>
        </Row>
        <Row>
          <Col md={6}>
            Email<br></br>
            <input type="email" name="email" {...register("email",
              { value: email, onChange: (e) => setemail(e.target.value) })}>
            </input>{email}
          </Col>
          <p className="error">{errors.email?.message}</p>
        </Row>
        <Row>
          <Col md={6}>
            Password<br></br>
            <input
              type="password"
              name="password"
              {...register("password",
                {
                  value: password,
                  onChange: (e) => setpassword(e.target.value)
                })}>
            </input>{password}
          </Col>
          <p className="error">{errors.password?.message}</p>
        </Row>
        <Row>
          <Col md={6}>
            Confirm Password<br></br>
            <input
              type="password"
              name="confirmpassword"
              {...register("confirmPassword",
                {
                  value: confirmPassword,
                  onChange: (e) => setconfirmPassword(e.target.value)
                })}>
            </input>{confirmPassword}
          </Col>
          <p className="error">{errors.confirmPassword?.message}</p>
        </Row>
        <Row className="mt-4">
          <Col md={8} className="mx-auto">
            <h3 className="text-center mb-3">List of Users</h3>

            <table className="table table-striped table-bordered text-center">
              <thead className="table-dark">
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userList.length > 0 ? (
                  userList.map((user) => (
                    <tr key={user.email}>
                      <td>{user.email}</td>
                      <td>{user.name}</td>
                      <td>{user.password}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            color="danger"
                            onClick={() => handleDelete(user.email)}
                            size="sm"
                          >
                            Delete
                          </Button>
                          <Link
                            to={`/update/${user.email}/${user.name}/${user.password}`}
                          >
                            <Button color="warning" size="sm">
                              Update
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Button>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Register;
