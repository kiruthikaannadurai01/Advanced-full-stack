const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const expressPort = 3000;

const secretKey = "mySecretKey123";

app.get('/login', (req, res) => {
    const user = { id: 1, username: 'john_doe' };

    const token = jwt.sign(user, secretKey, { expiresIn: '5s' });

    res.status(201).json({ generatedToken: token });
});

app.get('/profile', (req, res) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") return res.status(401).json({ message: "Token expired" });
            if (err.name === "JsonWebTokenError") return res.status(401).json({ message: "Invalid token" });
            return res.status(401).json({ message: "Authorization error" });
        }

        res.status(200).json({ message: "Access granted", user: decoded });
    });
});

app.listen(expressPort, () => {
    console.log(`Express server running on http://localhost:${expressPort}`);
});
