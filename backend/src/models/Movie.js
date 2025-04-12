import mongoose from 'mongoose';


const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
    min: 0,
    max: 5,
  },
  releaseDate: {
    type: Date,
    required: false,
  },
  genre: {
    type: [String],
    required: true,
  },
  director: {
    type: String,
    required: false,
  },
  cast: {
    type: [String],
    required: false,
  },
    moviePoster: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});
  
const Movie = mongoose.model('Movie', movieSchema);

export default Movie;