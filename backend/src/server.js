const express = require('express');
const { handleRequest } = require("./controllers/requestController");

const app = express();
const PORT = 3000;

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.post('/request', handleRequest);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server listened on port ${PORT}`);
});