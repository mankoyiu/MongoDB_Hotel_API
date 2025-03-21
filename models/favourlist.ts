import mongoose from 'mongoose';

const favourListSchema = new mongoose.Schema({
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true }
});

export const FavourList = mongoose.model('FavourList', favourListSchema);