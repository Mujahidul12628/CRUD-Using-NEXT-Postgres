const express = require('express');
const cors = require('cors');
const studentRoute = require('./src/student/routes');
const app = express();
const port = 3200;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Allah help us");
});

app.use('/api/v1/students', studentRoute);

app.listen(port, () => console.log(`app listen from port ${port}`))