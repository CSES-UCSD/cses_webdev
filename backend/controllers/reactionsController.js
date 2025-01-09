import Reactions from '../models/reactions.js';
import asyncHandler from 'express-async-handler';

export const getReaction = asyncHandler(async (req, res) => {
    const { userId, eventId } = req.params;

    if (!userId || !eventId) {
        res.status(400);
    }

    const reaction = await Reactions.findOne({ userId, eventId });

    if (reaction) {
        res.status(200).json(reaction); // Return the found reaction
    } else {
        res.status(404).json({ message: 'Reaction not found' }); // No reaction found
    }

})

export const createReaction = asyncHandler(async (req, res) => {
    const { userId, eventId, reactionType } = req.body;

    // Validate input
    if (!userId || !eventId || ![1, -1].includes(reactionType)) {
        res.status(400);
    }

    // Check if a reaction already exists
    const existingReaction = await Reactions.findOne({ userId, eventId });

    if (existingReaction) {
        // Update the existing reaction
        existingReaction.reactionType = reactionType;
        await existingReaction.save();
        res.status(200).json({
            message: 'Reaction updated successfully',
            reaction: existingReaction
        });
    } else {
        // Create a new reaction
        const newReaction = await Reactions.create({
            userId,
            eventId,
            reactionType
        });
        res.status(201).json({
            message: 'Reaction created successfully',
            reaction: newReaction
        });
    }
});

export default {
    getReaction,
    createReaction
};
