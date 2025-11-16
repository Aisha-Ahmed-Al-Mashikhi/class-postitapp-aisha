import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidation } from "../Validation/UserValidation";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateUserProfile } from "../Features/UserSlice";
import { Button, Col, Container, Row, FormGroup, Form } from "reactstrap";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  // من URL
  const { user_email, user_name, user_password } = useParams();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const [name, setname] = useState(user_name || "");
  const [email, setemail] = useState(user_email || "");
  const [password, setpassword] = useState(user_password || "");
  const [confirmPassword, setconfirmPassword] = useState(user_password || "");
  const [profilePic, setProfilePic] = useState(null);

  const handleUpdate = () => {
    const updatedUser = {
      name: name,
      email: email,
      password: password,
      profilePic: profilePic,
    };

    dispatch(updateUserProfile(updatedUser));
    alert("User Updated Successfully");
  };

  return (
    <Container>
      <h1>Update User</h1>

      <Form onSubmit={handleSubmit(handleUpdate)}>
        {/* Name */}
        <Row>
          <Col md={6}>
            Name
            <input
              type="text"
              {...register("name")}
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </Col>
          <p className="error">{errors.name?.message}</p>
        </Row>

        {/* Email */}
        <Row>
          <Col md={6}>
            Email
            <input
              type="email"
              {...register("email")}
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </Col>
          <p className="error">{errors.email?.message}</p>
        </Row>

        {/* Password */}
        <Row>
          <Col md={6}>
            Password
            <input
              type="password"
              {...register("password")}
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Col>
          <p className="error">{errors.password?.message}</p>
        </Row>

        {/* Confirm Password */}
        <Row>
          <Col md={6}>
            Confirm Password
            <input
              type="password"
              {...register("confirmPassword")}
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </Col>
          <p className="error">{errors.confirmPassword?.message}</p>
        </Row>

        {/* Profile Picture */}
        <Row>
          <Col md={6}>
            Profile Picture (optional)
            <input
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={6}>
            <Button color="primary">Update User</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UpdateUser;
