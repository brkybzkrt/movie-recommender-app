import express from "express";
import Movie from "../models/Movie.js";
import cloudinary from "../lib/cloudinary.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();

// Create a new movie
router.post('/',authMiddleware, async (req, res) => {
  try {
    // Validate request body
    const { title, description, rating, releaseDate, genre, director, cast, moviePoster } = req.body;
    if (!title || !genre) {
      return res.status(400).json({ message: 'Title and genre are required' });
    }

    const image =await cloudinary.uploader.upload(moviePoster, {
      folder: 'movie_posters',
    });
    // Create a new movie instance
    const movie = new Movie({...req.body, moviePoster: image.secure_url, user: req.user._id});

    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Get all movies
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const movies = await Movie.find().populate('user', 'username profilePicture').sort({ createdAt: -1 }).skip(skip).limit(limit);
    const totalMovies = await Movie.countDocuments();
    res.status(200).json({movies, totalMovies, currentPage: page, totalPages: Math.ceil(totalMovies / limit)});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
