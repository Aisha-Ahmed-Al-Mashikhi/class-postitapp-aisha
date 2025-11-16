import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Label,
  Form,
  FormGroup,
  Input,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { updateUserProfile } from "../Features/UserSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users.user);
  const email = user.email;

  useEffect(() => {
    if (!email) navigate("/login");
  }, [email, navigate]);

  const [userName, setUserName] = useState(user.name);
  const [pwd, setPwd] = useState(user.password);
  const [confirmPassword, setConfirmPassword] = useState(user.password);
  const [profilePic, setProfilePic] = useState(null);

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    const updatedUser = {
      email: user.email,
      name: userName,
      password: pwd,
      profilePic: profilePic,
    };

    dispatch(updateUserProfile(updatedUser));

    alert("Profile Updated");
    navigate("/profile");
  };

  return (
    <Container fluid>
      <h1>Profile</h1>

      <Row>
        <Col md={4}>
          <Form onSubmit={handleUpdate}>
            <FormGroup>
              <Label for="file">Profile Picture</Label>
              <Input
                type="file"
                name="profilePic"
                onChange={handleFileChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="email">Email</Label>
              <Input id="email" type="email" value={email} disabled />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Button color="primary" className="button">
                Update Profile
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
