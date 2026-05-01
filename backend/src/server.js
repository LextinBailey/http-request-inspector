const express = require('express');
const requestRoutes = require("./routes/requestRoutes");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(requestRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server listened on port ${PORT}`);
});