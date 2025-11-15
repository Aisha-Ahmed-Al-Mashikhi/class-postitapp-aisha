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
import { useParams } from "react-router-dom";
import { updateUser } from "../Features/UserSlice";


const UpdateUser = () => {

    const userList = useSelector((state) => state.users.value);

    const { user_email, user_name, user_password } = useParams();

    const [name, setname] = useState(user_name);
    const [email, setemail] = useState(user_email);
    const [password, setpassword] = useState(user_password);
    const [confirmPassword, setconfirmPassword] = useState(user_password);

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
            console.log("Form Data", data); // You can handle the form submission here
            alert("Validation all good.");
            const userData = {
                name: name,
                email: data.email,
                password: data.password,
            };
            dispatch(addUser(userData));
        }
        catch (error) {
            console.log(error);
        }

    }

    const handleUpdate = () => {

        const userData = {

            name: name, //create an object with the values from the state variables

            email: email,

            password: password,

        };

        dispatch(updateUser(userData)); //use the useDispatch hook to dispatch an action, passing as parameter the userData

    };
    return (
        <Container>
            <h1>Update User</h1>
            <Form onSubmit={handleSubmit(handleUpdate)}>
                <Row>
                    <Col md={6}>
                        Name<br></br>
                        <input type="text" name="name"
                            value={name}
                            {...register("name", {
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
                        <input type="email" name="email"
                            value={email}
                            {...register("email",
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
                            value={password}
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
                            value={password}
                            {...register("confirmPassword",
                                {
                                    value: confirmPassword,
                                    onChange: (e) => setconfirmPassword(e.target.value)
                                })}>
                        </input>{confirmPassword}
                    </Col>
                    <p className="error">{errors.confirmPassword?.message}</p>
                </Row>
                <Row>
                    <Col md={6}>
                        <Button>UpdateUser</Button>
                    </Col>
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
                                </tr>
                            </thead>
                            <tbody>
                                {userList.length > 0 ? (
                                    userList.map((user) => (
                                        <tr key={user.email}>
                                            <td>{user.email}</td>
                                            <td>{user.name}</td>
                                            <td>{user.password}</td>
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

            </Form>
        </Container>
    );
};

export default UpdateUser;
