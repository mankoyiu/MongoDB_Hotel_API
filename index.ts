import mongoose from 'mongoose';
import express from 'express';
import agencyRouter from './routers/agency';
import membersRouter from './routers/members';
import favourlistRouter from './routers/favourlist';
import messageRouter from './routers/message';
import hotelsRouter from './routers/hotels';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/travelAgency';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Use routers
app.use('/agency', agencyRouter);
app.use('/member', membersRouter);
app.use('/favourlist', favourlistRouter);
app.use('/message', messageRouter);
app.use('/hotel', hotelsRouter);

const PORT = process.env.PORT || 10888;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});