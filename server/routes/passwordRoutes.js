import express from 'express';
import { createPassword, getPasswords } from '../controllers/passwordController.js'; 

const router = express.Router();

router.post('/', createPassword);
router.get('/', getPasswords);

export default router;
 