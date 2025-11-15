import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import picURL from "../Images/user.png";
import { Label } from "reactstrap";

const Profile = () => {
  const email = useSelector((state) => state.users.user.email);
  const name = useSelector((state) => state.users.user.name);

  const navigate = useNavigate();
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email]);
  return (
    <div>
      <h1>Profile</h1>
      <img src={picURL} className="userImage center" alt="User" />
      <p>
        <Label> User Name:{name}</Label>
        <br />
        User Emil:{email}
      </p>
    </div>
  );
};

export default Profile;
