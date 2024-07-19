import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { deleteUser } from '../controllers/user.controller.js';
const router = express.Router();

router.delete('/delete/:userId', verifyToken, deleteUser);
export default router;
