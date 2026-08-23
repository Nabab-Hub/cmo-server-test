const express = require("express");
const cors = require('cors')
const videoRouter = require("./router/videoRouter");

const app = express();

const PORT = 8087;

// let's tackle cors
const REQ_URL = 'https://cmo-frontend-test.vercel.app'
// const REQ_URL = 'https://automatic-exam-bot.vercel.app'
const corsOption = {
    origin: REQ_URL,
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    credentials: true,
}
app.use(cors(corsOption))

// Middleware to read JSON request bodies
app.use(express.json());

// Routes
app.use("/", videoRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
