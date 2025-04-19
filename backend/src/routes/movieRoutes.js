import express from "express";
import Movie from "../models/Movie.js";
import cloudinary from "../lib/cloudinary.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();

// Create a new movie
router.post('/',authMiddleware, async (req, res) => {
  try {
    let imageUrl;
    const { title, description, rating, releaseDate, genres, director, cast, moviePoster } = req.body;
    if (!title || !genres) {
      return res.status(400).json({ message: 'Title and genre are required' });
    }

    if(moviePoster) {
     const image =await cloudinary.uploader.upload(moviePoster, {
      folder: 'movie_posters',
    });
    imageUrl= image.secure_url
    }

    const movie = new Movie({...req.body, userId: req.user._id,genres,...(imageUrl && { moviePoster: imageUrl })});

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

    const movies = await Movie.find().populate('user', 'username profilePicture').populate('genre', 'name _id').sort({ createdAt: -1 }).skip(skip).limit(limit);
    const totalMovies = await Movie.countDocuments();
    res.status(200).json({movies, totalMovies, currentPage: page, totalPages: Math.ceil(totalMovies / limit)});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/delete',authMiddleware, async (req, res) => {
    try {
      const { movieId } = req.body;
      const movie = await Movie.findById(movieId);

      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      if (movie.isDeleted) {
        return res.status(400).json({ message: 'Movie already deleted' });
      }

      if (movie.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this movie' });
      }
      
      // const publicId = movie.moviePoster.split('/').pop().split('.')[0];
      // await cloudinary.uploader.destroy(`movie_posters/${publicId}`);

      movie.isDeleted = true;
      await movie.save();
    

      res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
      
    }
})

export default router;
