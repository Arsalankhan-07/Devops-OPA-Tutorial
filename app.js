const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// function to ask OPA
async function checkAccess(user) {
    const response = await axios.post(
        "http://localhost:8181/v1/data/auth/allow",
        {
            input: { user }
        }
    );
    return response.data.result;
}

// Public route
app.get("/", (req, res) => {
    res.send("API is running");
});

// Protected route
app.post("/secure", async (req, res) => {
    try {
        const user = req.body.user;

        const allowed = await checkAccess(user);

        if (allowed) {
            return res.json({ message: "Access Granted ✅" });
        } else {
            return res.status(403).json({ message: "Access Denied ❌" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});