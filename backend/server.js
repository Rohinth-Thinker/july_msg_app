const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const connectToDb = require('./db/database');
const authRoutes = require('./routes/authRoutes');


const PORT = process.env.PORT_NUM;
const app = express();

app.use(express.json());
app.use(cors({
    origin : "http://localhost:5173",
}))

app.use('/api/auth', authRoutes);




app.listen(PORT, async () => {
    const db = await connectToDb('july_msg_app');
    console.log(`Server is listerning on port ${PORT}`);
})