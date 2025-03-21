import express, { Request, Response } from 'express';
import { Hotel } from '../models/hotels';

const router = express.Router();

// GET /hotel - Get all hotels
router.get('/', async (req: Request, res: Response) => {
    const hotels = await Hotel.find();
    res.json(hotels);
});

// POST /hotel - Add a new hotel
router.post('/', async (req: Request, res: Response) => {
    const { name, location, availability } = req.body;
    const hotel = new Hotel({ name, location, availability });
    await hotel.save();
    res.status(201).json(hotel);
});

// PUT /hotel - Update hotel details
router.put('/', async (req: Request, res: Response) => {
    const { id, name, location, availability } = req.body;
    const hotel = await Hotel.findByIdAndUpdate(id, { name, location, availability }, { new: true });
    if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
});

// DELETE /hotel - Delete a hotel
router.delete('/', async (req: Request, res: Response) => {
    const { id } = req.body;
    const hotel = await Hotel.findByIdAndDelete(id);
    if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted successfully' });
});

export default router;