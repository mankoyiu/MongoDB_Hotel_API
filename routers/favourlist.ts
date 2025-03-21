import express, { Request, Response } from 'express';
import { FavourList } from '../models/favourlist';

const router = express.Router();

// POST /favourlist - Add a hotel to the favourite list
router.post('/', async (req: Request, res: Response) => {
    const { memberId, hotelId } = req.body;
    const favourList = new FavourList({ memberId, hotelId });
    await favourList.save();
    res.status(201).json(favourList);
});

// PUT /favourlist - Update favourite list
router.put('/', async (req: Request, res: Response) => {
    const { id, hotelId } = req.body;
    const favourList = await FavourList.findByIdAndUpdate(id, { hotelId }, { new: true });
    if (!favourList) {
        return res.status(404).json({ message: 'Favourite list not found' });
    }
    res.json(favourList);
});

// DELETE /favourlist - Remove a hotel from the favourite list
router.delete('/', async (req: Request, res: Response) => {
    const { id } = req.body;
    const favourList = await FavourList.findByIdAndDelete(id);
    if (!favourList) {
        return res.status(404).json({ message: 'Favourite list not found' });
    }
    res.json({ message: 'Hotel removed from favourite list' });
});

export default router;