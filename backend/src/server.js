const express = require('express');
const { executeRequest } = require("./services/httpService");

const app = express();
const PORT = 3000;

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.post('/request', async (req, res) => {
    try {
        const { url, method, headers, body } = req.body;

        const options = {
            method,
            headers
        };

        if (method === "POST" && body && body.trim() !== "") {
            options.body = body;

            if (!headers || !headers["Content-Type"]) {
                options.headers = {
                    ...headers,
                    "Content-Type": "application/json"
                };
            }
        }

        console.log("Incoming request:", url, method);

        const response = await executeRequest(url, options);
        
        res.json(response);
    } catch (err) {
        console.error("Fetch error:", err.message);

        res.status(500).json({
            error: "Failed to fetch URL"
        });
    }
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server listened on port ${PORT}`);
});