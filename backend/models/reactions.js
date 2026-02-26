import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const reactionsSchema = new Schema({
    userEmail: {
        type: String,
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    reactionType: {
        type: Number,
        enum: [1, -1], // 1 = like, -1 = dislike
        required: true
    }
});

// Export model
export default model('Reactions', reactionsSchema);