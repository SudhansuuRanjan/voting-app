const PORT = process.env.PORT || 8000;
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');

const userRoutes = require('./routes/user.route');
const campaignRoutes = require('./routes/campaign.route');
const candidateRoutes = require('./routes/candidate.route');
const auditLogRoutes = require('./routes/auditlog.route');
const voteRoutes = require("./routes/vote.route");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.date(req, res, 'web'),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}))

connectDB();

app.use('/api/auth', userRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/auditlogs', auditLogRoutes);
app.use("/api/vote", voteRoutes);


app.get("/", function (req, res) {
    res.send("Hello World");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}🚀`);
})