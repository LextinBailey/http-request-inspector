const { executeRequest } = require("../services/httpService");
const pool = require("../db/db");

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

        await pool.query(
            `INSERT INTO requests
            (url, method, headers, body, status, response_body, response_headers, time_ms)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
                url,
                method,
                headers,
                body,
                response.status,
                response.body,
                response.headers,
                response.time
            ]
        );

        res.json(response);
    } catch (err) {
        console.error("Fetch error:", err.message);

        res.status(500).json({
            error: "Failed to fetch URL"
        });
    }
}

module.exports = { handleRequest };