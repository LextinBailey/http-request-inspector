async function executeRequest(url, options) {
    const start = Date.now();

    try {
        const response = await fetch(url, options);
        const data = await response.text();

        const time = Date.now() - start;

        return {
            status: response.status,
            headers: Object.fromEntries(response.headers.entries()),
            body: data,
            time
        };
    } catch (err) {
        throw new Error(`Request failed: ${err.message}`)
    }
}

module.exports = { executeRequest };