import express from 'express';
import reactionsController from '../controllers/reactionsController.js';

const router = express.Router();

//POST request for new reaction
router.post('/create', reactionsController.createReaction);

//GET request for user reaction
router.get('/:userEmail/:eventId', reactionsController.getReaction);

// Export router.
export default router;

