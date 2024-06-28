const PORT = process.env.PORT || 8000;
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/auth', userRoutes);







app.get("/", function (req, res) {
    res.send("Hello World");
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}🚀`);
})