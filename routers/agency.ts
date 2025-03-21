import express, { Request, Response } from 'express';
import { Agency } from '../models/agency';

const router = express.Router();

// POST /agency - Register a new travel agency operator
router.post('/', async (req: Request, res: Response) => {
    const { name, email, password, signUpCode } = req.body;
    if (signUpCode !== process.env.SIGN_UP_CODE) {
        return res.status(403).json({ message: 'Invalid sign up code' });
    }
    const agency = new Agency({ name, email, password });
    await agency.save();
    res.status(201).json(agency);
});

// PUT /agency - Update travel agency operator details
router.put('/', async (req: Request, res: Response) => {
    const { id, name, email } = req.body;
    const agency = await Agency.findByIdAndUpdate(id, { name, email }, { new: true });
    if (!agency) {
        return res.status(404).json({ message: 'Agency not found' });
    }
    res.json(agency);
});

// GET /agency/auth - Authenticate travel agency operator
router.get('/auth', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const agency = await Agency.findOne({ email, password });
    if (!agency) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json(agency);
});

export default router;