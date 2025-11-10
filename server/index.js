import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import bcrypt from "bcrypt";
import UserModel from "./Models/UserModel.js";
import * as ENV from "./config.js";

const app = express();
app.use(express.json());
//Middleware
const corsOptions = {
    origin: ENV.CLIENT_URL, //client URL local
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

//Database connection
const connectString = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=${ENV.DB_APP_NAME}`;
mongoose.connect(connectString);

//Post API for Register
app.post("/registerUser", async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const hashedpassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            name: name,
            email: email,
            password: hashedpassword,
        })
        await user.save();
        res.send({ user: user, msg: "Added." });

    } catch (error) {
        //console.log(error);
        res.status(500).json({ error: "An error occurred" });
    }
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body; //using destructuring
        //search the user
        const user = await UserModel.findOne({ email: email });
        //if not found
        if (!user) {
            return res.status(500).json({ error: "User not found." });
        }
        console.log(user);
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        //if everything is ok, send the user and message
        res.status(200).json({ user, message: "Success." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//POST API-logout

app.post("/logout", async (req, res) => {

    res.status(200).json({ message: "Logged out successfully" });

});

app.listen(3001, () => {
    console.log("You are connected");
});