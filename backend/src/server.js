const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/request', (req, res) => {
    console.log(req.body);
    res.send('Received');
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server listened on port ${PORT}`);
});