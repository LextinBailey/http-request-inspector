const express = require('express');
const app = express();
const PORT = 3000;

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.post('/request', async (req, res) => {
    try {
        const { url, method } = req.body;

        console.log("Incoming request:", url, method);

        const start = Date.now();

        const response = await fetch(url, { method });
        const data = await response.text();

        const time = Date.now() - start;

        res.json({ 
            status: response.status,
            headers: Object.fromEntries(response.headers.entries()),
            body: data,
            time
        });
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