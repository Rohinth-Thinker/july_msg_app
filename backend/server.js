const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const { connectToDb } = require('./db/database');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const postRoutes = require('./routes/postRoutes');
const usersRoutes = require('./routes/usersRoutes');

const PORT = process.env.PORT_NUM;
const app = express();

app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin : [ "http://localhost:5173", "http://192.168.188.136:5173", ]
// }))

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/post', postRoutes);
app.use('/api/users', usersRoutes);


app.listen(PORT, async () => {
    const db = await connectToDb('july_msg_app');
    console.log(`Server is listerning on port ${PORT}`);
})