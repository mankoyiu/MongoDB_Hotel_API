import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    content: { type: String, required: true },
    response: { type: String }
});

export const Message = mongoose.model('Message', messageSchema);