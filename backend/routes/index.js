const router = require('express').Router();

const authRoutes = require('./authRoutes');
const uploadRoutes = require('./uploadRoutes');
const postRoutes = require('./postRoutes');
const usersRoutes = require('./usersRoutes');
const conversationRoutes = require('./conversationRoutes');

router.use('/auth', authRoutes);
router.use('/upload', uploadRoutes);
router.use('/post', postRoutes);
router.use('/users', usersRoutes);
router.use('/conversation', conversationRoutes);

module.exports = router;