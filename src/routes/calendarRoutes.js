
import { Router } from 'express';
import { getEvents } from '../controllers/calendarController.js';

const router = Router();


router.get('/events', getEvents);

export default router;