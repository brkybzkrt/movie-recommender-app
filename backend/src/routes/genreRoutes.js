import express from "express";
import Genre from "../models/Genre.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get all genres
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new genre
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    const genre = new Genre({ name });
    await genre.save();
    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a genre by ID
router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a genre
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name });
    if (!genre) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a genre
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id, { isDeleted: true });
    if (!genre) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    res.status(200).json({ message: 'Genre deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
