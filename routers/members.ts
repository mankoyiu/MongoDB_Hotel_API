import express, { Request, Response } from 'express';
import { Member } from '../models/members';

const router = express.Router();

// POST /member - Register a new member
router.post('/', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const member = new Member({ name, email, password });
    await member.save();
    res.status(201).json(member);
});

// PUT /member - Update member details
router.put('/', async (req: Request, res: Response) => {
    const { id, name, email } = req.body;
    const member = await Member.findByIdAndUpdate(id, { name, email }, { new: true });
    if (!member) {
        return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
});

// DELETE /member - Delete a member
router.delete('/', async (req: Request, res: Response) => {
    const { id } = req.body;
    const member = await Member.findByIdAndDelete(id);
    if (!member) {
        return res.status(404).json({ message: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully' });
});

export default router;