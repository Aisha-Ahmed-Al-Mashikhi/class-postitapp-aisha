import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import bcrypt from "bcrypt";
import UserModel from "./Models/UserModel.js";
const app = express();
app.use(express.json());
app.use(cors());

//Database connection
const connectString = "mongodb+srv://admin:12345@postitcluster.maucq5a.mongodb.net/postITDb?appName=PostITCluster";

mongoose.connect(connectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

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

app.listen(3001, () => {
    console.log("You are connected");
});