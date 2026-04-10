const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let users = [];

app.post("/register", (req, res) => {
    const { username, mobile, password } = req.body;

    if (!username || !mobile || !password) {
        return res.json({ msg: "All fields required" });
    }

    if (mobile.length !== 10) {
        return res.json({ msg: "Invalid mobile" });
    }

    if (password.length < 6) {
        return res.json({ msg: "Password too short" });
    }

    users.push({ username, mobile, password });

    res.json({ msg: "User Registered Successfully" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});