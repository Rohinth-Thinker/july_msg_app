const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { connectToDb } = require('./db/database');
const router = require('./routes/index');
const { app, server } = require('./socket/socket');

const path = require('path');

const PORT = process.env.PORT_NUM;

app.use(express.static('static'))

app.use(express.json());
// app.use(cors());
app.use(cookieParser());
// app.use(cors({
//     origin : [ "http://localhost:5173", "http://192.168.188.136:5173", ],
//     credentials : true,
// }))

app.use('/api/store/media/profile', express.static('/home/rohinth/python_program_trail/practice/store/media/profile'));

app.use('/api', router);

app.get('/', (req, res) => {
    res.status(200).json({ msg : "HEY, is it working..??" });
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../static/index.html'))
})


server.listen(PORT, async () => {
    const db = await connectToDb('july_msg_app');
    console.log(`Server is listerning on port ${PORT}`);
    console.log('cors is implemented')
})
