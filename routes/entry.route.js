import express from 'express';
import * as entryController from '../controllers/entry.controller.js';
import { authenticateToken } from '../utils/middleware/auth.middleware.js';


const router = express.Router();

router.route('/')
    .get(authenticateToken, entryController.getAllUserEntry)
    .post(authenticateToken, entryController.createEntry);

router.route('/:id')
    .get(authenticateToken, entryController.getEntryById);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Entry:
 *       type: string
 *       required: true
 *       example:
 *          "This is an entry example with. \n break lines."
 */


/**
 * @swagger
 * tags:
 *   name: Entry
 *   description: The Entry managing API
 * /entry:
 *   post:
 *     summary: Create a new entry
 *     tags: [Entry]
 *     requestBody:
 *       required: true
 *       content:
 *         application/text:
 *           schema:
 *             $ref: '#/components/schemas/Entry'
 *     responses:
 *       200:
 *         description: The created Entry.
 *         content:
 *           application/text:
 *             schema:
 *               $ref: '#/components/schemas/Entry'
 *       500:
 *         description: Some server error
 *   get:
 *     summary: Get all user entry
 *     tags: [Entry]
 *     responses:
 *       200:
 *         description: The user has Entry.
 *         content:
 *           application/json:
 *             schema:
 *               type: array<object>
 *               properties:
 *                  summury: string
 *                  userId: string
 *                  paragraphs:
 *                      type: array<string>
 *       500:
 *         description: Some server error
 *
 */