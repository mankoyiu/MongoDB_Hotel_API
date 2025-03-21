import express, { Request, Response } from 'express';
import { Message } from '../models/message';

const router = express.Router();

// POST /message - Send a message to the travel agency operator
router.post('/', async (req: Request, res: Response) => {
    const { memberId, content } = req.body;
    const message = new Message({ memberId, content });
    await message.save();
    res.status(201).json(message);
});

// PUT /message - Update a message
router.put('/', async (req: Request, res: Response) => {
    const { id, content } = req.body;
    const message = await Message.findByIdAndUpdate(id, { content }, { new: true });
    if (!message) {
        return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
});

// DELETE /message - Delete a message
router.delete('/', async (req: Request, res: Response) => {
    const { id } = req.body;
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
        return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
});

export default router;