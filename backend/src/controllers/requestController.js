const { executeRequest } = require("../services/httpService");

async function handleRequest(req, res) {
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
}

module.exports = { handleRequest };